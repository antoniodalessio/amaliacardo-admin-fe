import * as React from 'react';
import { 
    ImageInput,
    ImageField,
    BooleanField,
    Edit,
    TextInput,
    TabbedForm,
    FormTab,
    required,
    ReferenceInput,
    SelectInput,
} from 'react-admin';

import RichTextInput from 'ra-input-rich-text';

import SortableGridField from '../../components/sortableGridField'

import CategoryIcon from '@material-ui/icons/Category';
export const CatIcon = CategoryIcon;



const CategoryTitle = ({record }) => {
    return <span>{record.category_name}</span>;
};


class CategoryEdit extends React.Component {

    render() {
      
      return(
        <Edit title={<CategoryTitle record />} {...this.props}>
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
                  {/*<ImageInput source="thumb_preview" label="Immagine di preview" accept="image/*">
                      <ImageField source="thumb_preview" title="title" />
                  </ImageInput>*/}
                  <TextInput parse={v => v.replace(" ", "-")} source="slug" validate={required()} />
              </FormTab>
              <FormTab label="meta">
                  <TextInput source="meta.title" label="meta title"/>
                  <TextInput source="meta.description"label="meta description" />
                  <TextInput source="meta.keywork" label="meta keyword"/>
              </FormTab>
              <FormTab label="Prodotti">
                <SortableGridField 
                  sortKey="ord"
                  resources="product"
                  parentResources="category"
                />
              </FormTab>
          </TabbedForm>
        </Edit>
      )
    }
}


export default CategoryEdit