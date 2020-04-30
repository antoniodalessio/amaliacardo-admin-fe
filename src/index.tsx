import * as React from 'react';
import { render } from 'react-dom';
import { fetchUtils, Admin, Resource } from 'react-admin';

import simpleRestProvider from './provider/dataProvider';
import authProvider from './provider/authProvider';

import { 
    ProductList,
    ProductEdit,
    ProductCreate,
    ProductIcon 
} from './resources/product/index';

import { 
    CategoryList,
    CategoryEdit,
    CatIcon,
    CategoryCreate
} from './resources/category/index';

const httpClient = (url, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};
const dataProvider = simpleRestProvider(`${process.env.BASE_PATH}${process.env.API_PATH}`, httpClient);

render(
    <Admin 
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
        <Resource 
            name="category"
            options={{ label: 'Categorie' }}
            label="Categorie"
            list={CategoryList}
            edit={CategoryEdit}
            create={CategoryCreate}
            icon={CatIcon}
        />
        <Resource 
            name="product"
            options={{ label: 'Prodotti' }}
            list={ProductList}
            edit={ProductEdit}
            create={ProductCreate}
            icon={ProductIcon}
        />
    </Admin>,
    document.getElementById('root')
);