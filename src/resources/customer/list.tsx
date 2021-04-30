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

const CustomerFilter = props => (
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
        <List {...props} exporter={false} filters={<CustomerFilter />}>
            <Datagrid>
                <TextField source="firstname" label="nome"/>
                <TextField source="lastname" label="cognome"/>
                <TextField source="address" label="indirizzo" />
                <TextField source="cell" label="cellulare"/>
                <EditButton basePath="/customer" />
            </Datagrid>
        </List>
        )
    };

export default UserList;