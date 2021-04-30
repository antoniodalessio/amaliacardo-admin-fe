import * as React from 'react';
import { 
    Edit,
    TextInput,
    TabbedForm,
    FormTab,
    DateTimeInput,
    ReferenceInput,
    SelectInput,
    BooleanInput
} from 'react-admin';

import RichTextInput from 'ra-input-rich-text';


const ReviewTitle = ({record }) => {
  return <span>{record.clientName}</span>;
};

class OrderEdit extends React.Component {

    render() {
      
      return(
        <Edit title={<ReviewTitle record />} {...this.props}>
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
        </Edit>
      )
    }
}


export default OrderEdit