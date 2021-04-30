import * as React from 'react';
import { 
    Create,
    TextInput,
    TabbedForm,
    FormTab,
    ImageInput,
    ImageField,
    BooleanInput
} from 'react-admin';


const FabricCreate = (props) => (
    <Create title="Create a Fabric" {...props}>
        <TabbedForm>
            <FormTab label="generali">
                <BooleanInput source="active" />
                <ImageInput source="file" label={"Immagine"} accept="image/*">
                    <ImageField source="uri" />
                </ImageInput>
                <TextInput source="cod" label="Codice"/>
                <TextInput source="color" label="Colore"/>
                <TextInput source="motif" label="Motivo"/>
                <TextInput source="composition" label="Composizione" fullWidth={true}/>
                <TextInput source="use" label="Uso" fullWidth={true}/>
            </FormTab>
        </TabbedForm>
    </Create>
);

export default FabricCreate