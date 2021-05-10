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
    BooleanField,
    BooleanInput,
    FormDataConsumer,
    DateInput
} from 'react-admin';

import RichTextInput from 'ra-input-rich-text';
import { Divider } from '@material-ui/core';

import BookIcon from '@material-ui/icons/Book';
export const ProductIcon = BookIcon;

import SortableGridField from '../../components/sortableGridField'
import Swapper from '../../components/swapper'


const ProductTitle = ({record = {title: ''}}) => {
    return <span>{record.title}</span>;
};

const Images = (props) => {
    return <SortableGridField 
        {...props}
        sortKey="ord"
        resources="image"
        parentResources="product"
        items={props.record.images}
    />
};


const ProductEdit = (props) => {

    return (
      <Edit title={<ProductTitle />} {...props}>
        <TabbedForm>
          <FormTab label="Generali">
              <BooleanField source="published" />
              <BooleanInput source="enabled" />
              <TextInput source="sku" />
              <TextInput source="title" />
              <TextInput source="description" fullWidth={true} multiline={true}/>
              <RichTextInput source="body" multiline={true} />
              <Divider />
              <TextInput source="subtitle" />
              <RichTextInput source="subbody" />
              <Divider />
              <TextInput parse={v => v.replace(" ", "-")} source="slug" validate={required()} fullWidth={true}/>
              <TextInput source="price" />
              <DateInput source="priceValidUntil" />
              <ReferenceInput label="Category" source="category" reference="category">
                  <SelectInput optionText="category_name" optionValue="_id" validate={required()} />
              </ReferenceInput>
              <h6 className="MuiTypography-h6">Meta</h6>
              <TextInput source="meta.title" label="meta title"/>
              <TextInput source="meta.description"label="meta description"  fullWidth={true}/>
              <TextInput source="meta.keywords" label="meta keywords"/>
          </FormTab>
          <FormTab label="immagini">
              <ArrayInput source="images">
                  <SimpleFormIterator>
                    <TextInput source="uri" label="Nome file" parse={v => v.replace(" ", "-")}/>
                    <TextInput source="alt"  label="Alt"/>
                    <TextInput source="ord"  label="Ordine"/>
                    <ImageInput source="file" label={"immagine"} accept="image/*">
                        <ImageField source="uri" />
                    </ImageInput>
                  </SimpleFormIterator>
              </ArrayInput>
          </FormTab>
          <FormTab label="Ordina immagini">
              <Images />
          </FormTab>
          <FormTab label="Tessuti interni">
              <Swapper source="fabrics.internal"/>
          </FormTab>
          <FormTab label="Tessuti esterni">
              <Swapper source="fabrics.external"/>
          </FormTab>
        </TabbedForm>
      </Edit>
    )
};


export default ProductEdit