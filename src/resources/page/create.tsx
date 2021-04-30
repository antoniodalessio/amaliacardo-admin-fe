import * as React from 'react';
import { 
    BooleanField,
    Create,
    TextInput,
    TabbedForm,
    FormTab,
    required,
    SimpleFormIterator,
    ArrayInput
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';


const PageCreate = (props) => (
    <Create title="Create a Page" {...props}>
        <TabbedForm>
            <FormTab label="generali">
                <BooleanField source="published" />
                <TextInput source="template" />
                <TextInput source="title" label="Titolo"/>
                <TextInput source="description" label="descrizione" fullWidth={true}/>
                <RichTextInput source="body" label="Corpo della pagina"/>
                <ArrayInput source="resources">
                  <SimpleFormIterator>
                    <TextInput source="type" label="Tipo"/>
                  </SimpleFormIterator>
                </ArrayInput>
                <TextInput parse={v => v.replace(" ", "-")} source="slug" validate={required()} fullWidth={true}/>
            </FormTab>
            <FormTab label="meta">
                <TextInput source="meta.title" label="meta title"/>
                <TextInput source="meta.description"label="meta description" fullWidth={true}/>
                <TextInput source="meta.keywords" label="meta keywords"/>
            </FormTab>
        </TabbedForm>
    </Create>
);

export default PageCreate