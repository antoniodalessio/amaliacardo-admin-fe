import { stringify } from 'query-string';
import { fetchUtils, DataProvider } from 'ra-core';

/**
 * Maps react-admin queries to a simple REST API
 *
 * This REST dialect is similar to the one of FakeRest
 *
 * @see https://github.com/marmelab/FakeRest
 *
 * @example
 *
 * getList     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * getOne      => GET http://my.api.url/posts/123
 * getMany     => GET http://my.api.url/posts?filter={id:[123,456,789]}
 * update      => PUT http://my.api.url/posts/123
 * create      => POST http://my.api.url/posts
 * delete      => DELETE http://my.api.url/posts/123
 *
 * @example
 *
 * import React from 'react';
 * import { Admin, Resource } from 'react-admin';
 * import simpleRestProvider from 'ra-data-simple-rest';
 *
 * import { PostList } from './posts';
 *
 * const App = () => (
 *     <Admin dataProvider={simpleRestProvider('http://path.to.my.api/')}>
 *         <Resource name="posts" list={PostList} />
 *     </Admin>
 * );
 *
 * export default App;
 */


const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file.rawFile);
    });


const createFileFromUri = (record, key) => {
    const imageName = (' ' + record[key]).slice(1);
    record.file = {
        rawFile: new File([], imageName),
        uri: `${process.env.SITE_IMAGE_PATH}${imageName}_thumb.jpg`,
        original: true
    }
}

const handleInputData = (data) =>{

    if (data.images && data.images.length > 0) {
        data.images.map((image) => createFileFromUri(image, 'uri'))
    }

    if (data.thumb_preview) {
        createFileFromUri(data, 'thumb_preview')
    }

    return data
}

function isEmpty(obj) {
    for(const key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const handleOutputData = async (data) => {
    if (data.images && data.images.length > 0) {

        for (const image of data.images) {
            if (image.file && image.file.rawFile && !isEmpty(image.file.rawFile)) {
                image.file.base64 = await convertFileToBase64(image.file)
            }
        }
    }

    if (data.file && data.file.rawFile && !isEmpty(data.file.rawFile)) {
        data.file.base64 = await convertFileToBase64(data.file)
    }
}

const simpleRestProvider =  (apiUrl, httpClient = fetchUtils.fetchJson): DataProvider => ({
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => {
            if (!headers.has('content-range')) {
                throw new Error(
                    'The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?'
                );
            }
            return {
                data: json.map(resource => { 
                    handleInputData(resource)
                    return ({ ...resource, id: resource._id })
                }),
                total: parseInt(
                    headers
                        .get('content-range')
                        .split('/')
                        .pop(),
                    10
                ),
            };
        });
    },

    getOne: async (resource, params) => {
        return httpClient(`${apiUrl}/${resource}/${params.id}`).then( async ({ json }) => { 
            handleInputData(json)
            return ({
                data: { ...json, id: json._id },
        })})
    },

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ 
            data: json.map(resource => {
                handleInputData(resource)
                return ({ ...resource, id: resource._id }) 
            }),
        }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => {
            if (!headers.has('content-range')) {
                throw new Error(
                    'The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?'
                );
            }
            return {
                data: json.map(resource => {
                    handleInputData(resource)
                    return ({ ...resource, id: resource._id }) 
                }),
                total: parseInt(
                    headers
                        .get('content-range')
                        .split('/')
                        .pop(),
                    10
                ),
            };
        });
    },

    update: async (resource, params) => {

        await handleOutputData(params.data)

        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => {
            console.log(json)
            return ({ ...json, id: json._id })
        })
    },

    // simple-rest doesn't handle provide an updateMany route, so we fallback to calling update n times instead
    updateMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                })
            )
        ).then(responses => ({ data: responses.map(({ json }) => json.id) })),

    create: async (resource, params) => {

        await handleOutputData(params.data)

        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json._id },
        }))
    
    },

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ 
             ...json, id: json._id
        })),

    // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    deleteMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'DELETE',
                })
            )
        ).then(responses => ({ data: responses.map(({ json }) => json.id) })),
    publish: (params) => {
        let queryString = '?'
        if (params && params.unpublished) {
            queryString += 'unpublished=true'
        }
        
        return httpClient(`${apiUrl}/publish${queryString}`, {
            method: 'GET',
        }).then((response) => {
            return response.json
        })
    }
});


const httpClient = (url, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(`${process.env.BASE_PATH}${process.env.API_PATH}`, httpClient);

export default dataProvider