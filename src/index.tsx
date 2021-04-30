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
    PageList,
    PageEdit,
    PageIcon,
    PageCreate
} from './resources/page/index';

import { 
    UserList,
    UserEdit,
    UserIcon,
    UserCreate
} from './resources/user/index';

import { 
    CustomerList,
    CustomerEdit,
    CustomerIcon,
    CustomerCreate
} from './resources/customer/index';

import { 
    FabricList,
    FabricEdit,
    FabricIcon,
    FabricCreate
} from './resources/fabric/index';

import { 
    ReviewList,
    ReviewEdit,
    ReviewIcon,
    ReviewCreate
} from './resources/review/index';

import { 
    OrderList,
    OrderEdit,
    OrderIcon,
    OrderCreate
} from './resources/order/index';


import { 
    SubmissionList,
    SubmissionShow,
    SubmissionIcon,
} from './resources/submission/index';



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
            name="page"
            options={{ label: 'Pagine' }}
            list={PageList}
            edit={PageEdit}
            create={PageCreate}
            icon={PageIcon}
        />
        <Resource 
            name="fabric"
            options={{ label: 'Tessuti' }}
            list={FabricList}
            edit={FabricEdit}
            create={FabricCreate}
            icon={FabricIcon}
        />
        <Resource 
            name="review"
            options={{ label: 'Recensioni' }}
            list={ReviewList}
            edit={ReviewEdit}
            create={ReviewCreate}
            icon={ReviewIcon}
        />
        <Resource
            name="customer"
            options={{ label: 'Clienti' }}
            list={CustomerList}
            edit={CustomerEdit}
            create={CustomerCreate}
            icon={CustomerIcon}
        />
        <Resource
            name="submission"
            options={{ label: 'Richieste info' }}
            list={SubmissionList}
            show={SubmissionShow}
            icon={SubmissionIcon}
        />
        <Resource
            name="user"
            options={{ label: 'Utenti' }}
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
            icon={UserIcon}
        />
        <Resource
            name="order"
            options={{ label: 'Ordini' }}
            list={OrderList}
            edit={OrderEdit}
            create={OrderCreate}
            icon={OrderIcon}
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