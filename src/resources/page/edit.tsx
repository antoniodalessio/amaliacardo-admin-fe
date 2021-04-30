import * as React from 'react';
import { 
    BooleanField,
    Edit,
    TextInput,
    TabbedForm,
    FormTab,
    required,
    ArrayInput,
    SimpleFormIterator
} from 'react-admin';

import RichTextInput from 'ra-input-rich-text';

const PageTitle = ({record }) => {
  return <span>{record.Page_name}</span>;
};

class PageEdit extends React.Component {

    render() {
      
      return(
        <Edit title={<PageTitle record />} {...this.props}>
          <TabbedForm>
              <FormTab label="generali">
                <BooleanField source="published" />
                <TextInput source="template" />
                <TextInput source="title" />
                <TextInput source="description" fullWidth={true}/>
                <RichTextInput source="body" />
                <TextInput source="subtitle" />
                <RichTextInput source="subbody" />
                <TextInput parse={v => v.replace(" ", "-")} source="slug" validate={required()} fullWidth={true}/>
                <ArrayInput source="resources">
                  <SimpleFormIterator>
                    <TextInput source="type" label="Tipo"/>
                  </SimpleFormIterator>
                </ArrayInput>
                <TextInput source="ord" label="ordine" />
              </FormTab>
              <FormTab label="meta">
                  <TextInput source="meta.title" label="meta title"/>
                  <TextInput source="meta.description"label="meta description" fullWidth={true}/>
                  <TextInput source="meta.keywords" label="meta keywords"/>
              </FormTab>
          </TabbedForm>
        </Edit>
      )
    }
}


export default PageEdit