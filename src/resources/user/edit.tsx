import * as React from 'react';
import { 
    BooleanField,
    Edit,
    TextInput,
    TabbedForm,
    FormTab,
    required,
    ReferenceInput,
    SelectInput,
    ImageInput,
    ImageField,
    PasswordInput
} from 'react-admin';

import RichTextInput from 'ra-input-rich-text';

import SortableGridField from '../../components/sortableGridField'

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
                <TextInput source="firstname" label="Nome" />
                <TextInput source="lastname" label="cognome" />
                <TextInput source="username" label="Username" />
                <PasswordInput source="password" />
              </FormTab>
          </TabbedForm>
        </Edit>
      )
    }
}


export default UserEdit