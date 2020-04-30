import * as React from 'react';
import { 
    ImageInput,
    ImageField,
    BooleanField,
    Create,
    TextInput,
    TabbedForm,
    FormTab,
    required,
    ReferenceInput,
    SelectInput
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';


const CategoryCreate = (props) => (
    <Create title="Create a category" {...props}>
        <TabbedForm>
            <FormTab label="generali">
                <BooleanField source="published" />
                <ReferenceInput label="Categoria Padre" source="parent" reference="category">
                    <SelectInput optionText="category_name" optionValue="_id" />
                </ReferenceInput>
                <TextInput source="category_name" />
                <TextInput source="title" />
                <TextInput source="description" />
                <RichTextInput source="text" />
                <ImageInput source="thumb_preview" label="Immagine di preview" accept="image/*">
                    <ImageField source="thumb_preview" title="title" />
                </ImageInput>
                <TextInput parse={v => v.replace(" ", "-")} source="slug" validate={required()} />
                </FormTab>
            <FormTab label="meta">
                <TextInput source="meta.title" label="meta title"/>
                <TextInput source="meta.description"label="meta description" />
                <TextInput source="meta.keywork" label="meta keyword"/>
            </FormTab>
        </TabbedForm>
    </Create>
);

export default CategoryCreate