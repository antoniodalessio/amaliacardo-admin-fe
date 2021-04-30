import * as React from 'react';
import { 
    List,
    Datagrid,
    TextField,
    EditButton,
    Filter,
    SearchInput,
    ImageField,
    BooleanField
} from 'react-admin';


import FabricIcon from '@material-ui/icons/GridOn';
export const CatIcon = FabricIcon;


const FabricFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
);

const Image = ({record}) => (
    <img width="100" src={process.env.SITE_IMAGE_PATH + record.thumb_preview + "_thumb.jpg"} ></img>
);

const cardStyle = {
    width: 300,
    minHeight: 300,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};


const FabricList = (props) => {
    return (
        <List {...props} exporter={false} filters={<FabricFilter />} perPage={25}>
            <Datagrid>
                <BooleanField source="active" label="Attivo" />
                <TextField source="cod" label="Codice"/>
                <Image record/>
                <TextField source="color"  label="Colore"/>
                <TextField source="motif" label="Motivo"/>
                <TextField source="composition" label="Composizione"/>
                <TextField source="use" label="Uso"/>
                <EditButton basePath="/Fabric" />
            </Datagrid>
        </List>
        )
    };

export default FabricList;