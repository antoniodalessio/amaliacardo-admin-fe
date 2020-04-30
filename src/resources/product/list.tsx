import * as React from 'react';
import { 
    SelectInput,
    Filter,
    List,
    Datagrid, 
    TextField,
    EditButton,
    ReferenceInput,
    ReferenceField,
    BooleanField,
    ChipField
} from 'react-admin';


// const ProductFilter = (props) => (
//     <Filter {...props}>
//        <ReferenceInput label="Category" source="category" reference="category"> // no need for allowEmpty
//             <SelectInput optionText="category_name" optionValue="_id" />
//         </ReferenceInput>
//     </Filter>
// );

const ProductList = (props) => (
    <List {...props }>
        <Datagrid>
            <BooleanField source="published" />
            <TextField source="title" />
            <TextField source="slug" />
            <ReferenceField label="Category" source="category" reference="category">
                <ChipField source="category_name" />
            </ReferenceField>
            <EditButton basePath="/product" />
        </Datagrid>
    </List>
);


export default ProductList
