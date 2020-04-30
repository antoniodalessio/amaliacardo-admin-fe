import * as React from 'react';
import { 
    BooleanField,
    List,
    Datagrid,
    TextField,
    EditButton,
    ReferenceField,
    ChipField
} from 'react-admin';

import CategoryIcon from '@material-ui/icons/Category';
export const CatIcon = CategoryIcon;


const CategoryList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <BooleanField source="published" />
                <TextField source="title" />
                <TextField source="slug" />
                <ReferenceField label="Categoria padre" source="parent" reference="category">
                    <ChipField source="category_name" />
                </ReferenceField>
                <EditButton basePath="/category" />
            </Datagrid>
        </List>)
    };

export default CategoryList;