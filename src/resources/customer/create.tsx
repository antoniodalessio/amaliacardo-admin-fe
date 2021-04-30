import * as React from 'react';
import { 
    Create,
    TextInput,
    SimpleForm
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';


const UserCreate = (props) => (
    <Create title="Crea informazioni sul cliente" {...props}>
        <SimpleForm>
            <TextInput source="firstname" label="nome"/>
            <TextInput source="lastname" label="cognome" />
            <TextInput source="email" label="Indirizzo email" />
            <TextInput fullWidth={true} source="address" label="indirizzo" />
            <TextInput source="cell" label="Numero cellulare" />
            <RichTextInput source="info" label="Ulteriori informazioni" />
        </SimpleForm>
    </Create>
);

export default UserCreate