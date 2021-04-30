import * as React from 'react';
import { 
    Edit,
    TextInput,
    TabbedForm,
    FormTab,
    SimpleShowLayout,
    ReferenceManyField,
    SingleFieldList,
    TextField,
    DateField
} from 'react-admin';

import RichTextInput from 'ra-input-rich-text';

import CategoryIcon from '@material-ui/icons/Category';
export const CatIcon = CategoryIcon;

const UserTitle = ({record }) => {
  return <span>{record.category_name}</span>;
};

class UserEdit extends React.Component {

    render() {
      
      return(
        <Edit title={<UserTitle record />} {...this.props}>
          <TabbedForm>
              <FormTab label="generali">
                <TextInput source="firstname" label="nome"/>
                <TextInput source="lastname" label="cognome" />
                <TextInput source="email" label="Indirizzo email" />
                <TextInput fullWidth={true} source="address" label="indirizzo" />
                <TextInput source="cell" label="Numero cellulare" />
                <RichTextInput source="info" label="Ulteriori informazioni" />
              </FormTab>
              <FormTab label="Messaggi inviati dal cliente">
                <SimpleShowLayout>
                <ReferenceManyField label="Send" reference="submission" target="customer">
                    <SingleFieldList>
                        <TextField label="text" source="text" fullWidth={true} />
                    </SingleFieldList>
                </ReferenceManyField>
                </SimpleShowLayout>
              </FormTab>
          </TabbedForm>
        </Edit>
      )
    }
}


export default UserEdit