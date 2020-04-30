import * as React from 'react';
import { 
    required,
    SelectInput,
    ArrayInput,
    ImageInput,
    ImageField,
    SimpleFormIterator,
    Edit,
    TextInput,
    ReferenceInput,
    TabbedForm,
    FormTab,
    BooleanField
} from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
export const ProductIcon = BookIcon;


const ProductTitle = ({record}) => {
    return <span>{record.title}</span>;
};


const ProductEdit = (props) => {

    return (
        <Edit title={<ProductTitle />} {...props}>
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
                <FormTab label="immagini">
                    <ArrayInput source="images">
                        <SimpleFormIterator>
                            <TextInput source="uri" label="name" parse={v => v.replace(" ", "-")} />
                            <TextInput source="alt" label="alt"  />
                            <ImageInput source="imagedata" label="Related pictures" accept="image/*">
                                <ImageField source="uri" />
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
        </Edit>
    )
};


export default ProductEdit