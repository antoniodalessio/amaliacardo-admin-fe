import * as React from 'react';
import { 
    Create,
    TextInput,
    TabbedForm,
    FormTab,
    DateTimeInput,
    ReferenceInput,
    SelectInput,
    BooleanInput
} from 'react-admin';

import RichTextInput from 'ra-input-rich-text';

const OrderCreate = (props) => (
    <Create title="Crea un ordine" {...props}>
        <TabbedForm>
            <FormTab label="generali">
                <TextInput source="clientName" label="Nome del cliente"/>
                <TextInput source="products" label="Prodotti richiesti" fullWidth={true} />
                <DateTimeInput source="acquisitionDate" label="Data acquisizione"/>
                <DateTimeInput source="orderFulfillmentDate" label="Data evasione"/>
                <DateTimeInput source="paymentDate" label="Data pagamento"/>
                <TextInput source="price" label="Prezzo"/>
                <RichTextInput source="comment" />
            </FormTab>
        </TabbedForm>
    </Create>
);

export default OrderCreate