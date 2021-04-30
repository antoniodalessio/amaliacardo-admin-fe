import * as React from 'react';
import { 
    Edit,
    TextInput,
    TabbedForm,
    FormTab,
    DateTimeInput,
    ReferenceInput,
    SelectInput,
    BooleanInput
} from 'react-admin';

import ReviewIcon from '@material-ui/icons/GridOn';
export const CatIcon = ReviewIcon;

const ReviewTitle = ({record }) => {
  return <span>{record.Review_name}</span>;
};

const pagination = { range : 0}

class ReviewEdit extends React.Component {

  

    render() {
      
      return(
        <Edit title={<ReviewTitle record />} {...this.props}>
          <TabbedForm>
              <FormTab label="generali">
              <TextInput source="username" label="Nome"/>
                <TextInput source="comment" label="Commento"  fullWidth={true}/>
                <TextInput source="city" label="Città"/>
                <BooleanInput source="approved" label="Approvato"/>
                <DateTimeInput source="publishedAt" />
                <ReferenceInput label="Prodotto" source="product" reference="product" perPage={0}>
                    <SelectInput optionText="title" optionValue="_id" />
                </ReferenceInput>
              </FormTab>
          </TabbedForm>
        </Edit>
      )
    }
}


export default ReviewEdit