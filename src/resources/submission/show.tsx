import * as React from 'react';
import { 
    Show,
    FormTab,
    SimpleShowLayout,
    TextField,
    ReferenceField,
    ChipField,
    DateField
} from 'react-admin';

import SubmissionIcon from '@material-ui/icons/GridOn';
export const CatIcon = SubmissionIcon;


class SubmissionShow extends React.Component {

    render() {
      
      return(
        <Show {...this.props}>
          <SimpleShowLayout>
              <ReferenceField label="Cliente" source="customer" reference="customer">
                  <ChipField source="firstname" />
              </ReferenceField>
              <TextField source="text" />
              <ReferenceField label="Prodotto" source="product" reference="product">
                    <ChipField source="title" />
                </ReferenceField>
              <DateField label="Publication date" source="requestAt" />
          </SimpleShowLayout>
        </Show>
      )
    }
}


export default SubmissionShow