import * as React from 'react';
import { 
    List,
    Datagrid,
    TextField,
    EditButton,
    Filter,
    SearchInput,
    DateField,
    BooleanField
} from 'react-admin';



const OrderFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
);



const OrderList = (props) => {
    return (
        <List {...props} exporter={false} filters={<OrderFilter />}>
            <Datagrid>
                <TextField source="clientName" label="Nome del cliente"/>
                <TextField source="products"  label="Prodotti richiesti"/>
                <DateField source="acquisitionDate" label="Ordine acquisito" />
                <DateField source="orderFulfillmentDate" label="Ordine evaso" />
                <EditButton basePath="/Order" />
            </Datagrid>
        </List>
        )
    };

export default OrderList;