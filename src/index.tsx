import * as React from 'react';
import { render } from 'react-dom';
import { Admin, Resource } from 'react-admin';

import dataProvider from './provider/dataProvider';
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

import { 
    PublishShow,
    PubIcon
} from './resources/publish/index';

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
        <Resource
            name="publish"
            options={{ label: 'Pubblica' }}
            list={PublishShow}
            icon={PubIcon}
        />
    </Admin>,
    document.getElementById('root')
);