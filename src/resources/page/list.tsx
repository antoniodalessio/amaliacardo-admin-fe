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
} from 'react-admin';


const PageFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
);

const PageList = (props) => {
    return (
        <List {...props} exporter={false} filters={<PageFilter />}>
            <Datagrid>
                <BooleanField source="published" />
                <TextField source="title" />
                <TextField source="slug" />
                <EditButton basePath="/Page" />
            </Datagrid>
        </List>
        )
    };

export default PageList;