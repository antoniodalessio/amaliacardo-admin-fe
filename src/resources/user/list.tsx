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
  
import PersonIcon from '@material-ui/icons/Person';
export const UserIcon = PersonIcon;

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

const UserList = (props) => {
    return (
        <List {...props} exporter={false} filters={<CategoryFilter />}>
            <Datagrid>
                <TextField source="firstname" />
                <TextField source="lastname" />
                <TextField source="username" />
                <EditButton basePath="/user" />
            </Datagrid>
        </List>
        )
    };

export default UserList;