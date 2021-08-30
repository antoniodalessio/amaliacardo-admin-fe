import * as React from 'react';
import {
    Filter,
    List,
    Datagrid, 
    TextField,
    EditButton,
    ReferenceField,
    BooleanField,
    ChipField,
    SearchInput,
    Pagination
} from 'react-admin';

const ProductFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
);

const ProductPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

const ProductList = (props) => (
    <List {...props } exporter={false} filters={<ProductFilter />} pagination={<ProductPagination />} perPage={100}>
        <Datagrid>
            <BooleanField source="published" />
            <BooleanField source="enabled" />
            <TextField source="sku" />
            <TextField source="title" />
            <TextField source="slug" />
            <TextField source="price" />
            <ReferenceField label="Category" source="category" reference="category">
                <ChipField source="category_name" />
            </ReferenceField>
            <EditButton basePath="/product" />
        </Datagrid>
    </List>
);


export default ProductList
