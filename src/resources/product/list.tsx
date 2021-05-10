import * as React from 'react';
import { 
    SelectInput,
    Filter,
    List,
    Datagrid, 
    TextField,
    EditButton,
    ReferenceField,
    BooleanField,
    ChipField,
    SearchInput
} from 'react-admin';

const ProductFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
);

const ProductList = (props) => (
    <List {...props } exporter={false} filters={<ProductFilter />}>
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
