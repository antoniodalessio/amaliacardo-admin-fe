import * as React from 'react';
import { 
    required,
    SelectInput,
    ArrayInput,
    ImageInput,
    ImageField,
    SimpleFormIterator,
    Create,
    TextInput,
    ReferenceInput,
    TabbedForm,
    FormTab,
    BooleanField,
} from 'react-admin';

const ProductCreate = (props) => (
    <Create title="Create a Post" {...props}>
        <TabbedForm>
            <FormTab label="Generali">
                <BooleanField source="published" />
                <TextInput source="title" />
                <TextInput source="description" />
                <TextInput parse={v => v.replace(" ", "-")} source="slug" validate={required()} />
                <ReferenceInput label="Category" source="category" reference="category">
                    <SelectInput optionText="category_name" optionValue="_id" validate={required()} />
                </ReferenceInput>
            </FormTab>
            <FormTab label="Immagini">
                <ArrayInput source="images">
                        <SimpleFormIterator>
                            <TextInput source="uri" label="name" />
                            <TextInput source="alt" label="alt"/>
                            <ImageInput source="imagedata" label="Related pictures" accept="image/*">
                                <ImageField source="uri" title="title" />
                            </ImageInput>
                        </SimpleFormIterator>
                    </ArrayInput>
            </FormTab>
            <FormTab label="meta">
                <TextInput source="meta.title" label="meta title"/>
                <TextInput source="meta.description"label="meta description" />
                <TextInput source="meta.keywork" label="meta keyword"/>
            </FormTab>
        </TabbedForm>
    </Create>
);


export default ProductCreate