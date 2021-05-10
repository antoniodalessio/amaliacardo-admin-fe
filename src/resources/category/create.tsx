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
    BooleanInput
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';


const CategoryCreate = (props) => (
    <Create title="Create a category" {...props}>
        <TabbedForm>
            <FormTab label="generali">
                <BooleanField source="published" />
                <BooleanInput source="enabled" />
                <ReferenceInput label="Categoria Padre" source="parent" reference="category">
                    <SelectInput optionText="category_name" optionValue="_id" />
                </ReferenceInput>
                <TextInput source="category_name" />
                <TextInput source="title" />
                <TextInput source="description" />
                <RichTextInput source="text" />
                <TextInput parse={v => v.replace(" ", "-")} source="slug" validate={required()} fullWidth={true}/>
                <TextInput source="icon" />
                <h6 className="MuiTypography-h6">Meta</h6>
                <TextInput source="meta.title" label="meta title"/>
                <TextInput source="meta.description"label="meta description" fullWidth={true}/>
                <TextInput source="meta.keywords" label="meta keywords"/>
            </FormTab>
            <FormTab label="Immagine di copertina">
                <TextInput source="thumb_preview" parse={v => v.replace(" ", "-")}/>
                <ImageInput source="file" label={"Immagine di copertina"} accept="image/*">
                    <ImageField source="uri" />
                </ImageInput>
            </FormTab>
        </TabbedForm>
    </Create>
);

export default CategoryCreate