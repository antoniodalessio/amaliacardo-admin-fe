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
    Query,
    Loading,
} from 'react-admin';



import RichTextInput from 'ra-input-rich-text';

import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

import CategoryIcon from '@material-ui/icons/Category';
export const CatIcon = CategoryIcon;

const SortableItem = SortableElement(({value}) => <li><img src="https://via.placeholder.com/150"></img></li>);


const SortableList = SortableContainer(({items}) => {
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value} />
        ))}
      </ul>
    );
  });

  class SortableComponent extends React.Component {
    state = {
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    };
    onSortEnd = ({oldIndex, newIndex}) => {
      this.setState(({items}) => ({
        items: arrayMove(items, oldIndex, newIndex),
      }));
    };
    render() {
      //console.log(this.props)
      return (<SortableList items={this.state.items} onSortEnd={this.onSortEnd} />);
    }
  }


const CategoryTitle = ({record}) => {
    return <span>{record.category_name}</span>;
};



const ProductList = ({record}) => {

  const payload = {
    pagination: { page: 1, perPage: 10 },
    sort: { field: 'ord', order: 'ASC' },
    filter: { category: record._id}
  };
  
  return (
    <Query type="getList" resource="product" payload={payload}>
        { ({data, loading, error}) => {
            if (loading) { return <Loading />; }
            if (error) { return <p>ERROR</p>; }
            return (
              <ul>
                  {
                  data.map( (product, index) => {
                    const url = `http://www.amaliacardo.it/images/work/${product.images[0].uri}_thumb.jpg`
                    return (<li key={index}><img src={url} /></li>) })
                  }
              </ul>
          );
            
          }
        }
    </Query>)
}

class CategoryEdit extends React.Component {

    render() {
      
      return(
        <Edit title={<CategoryTitle />} {...this.props}>
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
                <ProductList />
              </FormTab>
          </TabbedForm>
        </Edit>
      )
    }
}


export default CategoryEdit