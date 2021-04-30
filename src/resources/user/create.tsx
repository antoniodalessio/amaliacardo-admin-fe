import * as React from 'react';
import { 
    BooleanField,
    Create,
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


const UserCreate = (props) => (
    <Create title="Create a category" {...props}>
        <TabbedForm>
            <FormTab label="generali">
                <TextInput source="firstname" label="Nome" />
                <TextInput source="lastname" label="cognome" />
                <TextInput source="username" label="Username" />
                <PasswordInput source="password" />
            </FormTab>
        </TabbedForm>
    </Create>
);

export default UserCreate