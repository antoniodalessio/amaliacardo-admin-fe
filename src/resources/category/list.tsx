import * as React from 'react';
import { 
    BooleanField,
    List,
    Datagrid,
    TextField,
    EditButton,
    ReferenceField,
    ChipField,
    Filter,
    SearchInput,
    Pagination
} from 'react-admin';
  

import CategoryIcon from '@material-ui/icons/Category';
export const CatIcon = CategoryIcon;


const CategoryFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
);

const cardStyle = {
    width: 300,
    minHeight: 300,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};

const CategoryPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;


const CategoryList = (props) => {
    return (
        <List {...props} exporter={false} filters={<CategoryFilter />} pagination={<CategoryPagination />} perPage={100}>
            <Datagrid>
                <BooleanField source="published" />
                <BooleanField source="enabled" />
                <TextField source="title" />
                <TextField source="slug" />
                <TextField source="ord" />
                <ReferenceField label="Categoria padre" source="parent" reference="category">
                    <ChipField source="category_name" />
                </ReferenceField>
                <EditButton basePath="/category" />
            </Datagrid>
        </List>
        )
    };

export default CategoryList;