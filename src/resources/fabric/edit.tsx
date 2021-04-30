import * as React from 'react';
import { 
    Edit,
    TextInput,
    TabbedForm,
    FormTab,
    ImageInput,
    ImageField,
    BooleanInput
} from 'react-admin';

import FabricIcon from '@material-ui/icons/GridOn';
export const CatIcon = FabricIcon;

const FabricTitle = ({record }) => {
  return <span>{record.Fabric_name}</span>;
};

class FabricEdit extends React.Component {

    render() {
      
      return(
        <Edit title={<FabricTitle record />} {...this.props}>
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
        </Edit>
      )
    }
}


export default FabricEdit