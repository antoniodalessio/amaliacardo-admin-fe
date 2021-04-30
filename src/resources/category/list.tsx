import * as React from 'react';
import { 
    BooleanField,
    List,
    Datagrid,
    TextField,
    EditButton,
    ReferenceField,
    ChipField,
    Filter,
    SearchInput,
} from 'react-admin';

import {
    Card,
    CardContent,
    CardActions,
    CardHeader
  } from '@material-ui/core' 
  

import CategoryIcon from '@material-ui/icons/Category';
export const CatIcon = CategoryIcon;


const CategoryFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
);

const cardStyle = {
    width: 300,
    minHeight: 300,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};

/*const CategoryGrid = ({ ids, data, basePath }) => (
    <div style={{ margin: '1em' }}> 
        {ids.map(id =>
        <Card key={id} style={cardStyle}>
            <CardHeader
                title={<TextField record={data[id]} source="title" />}
            />
            <CardContent>
                <img style={{width: '100%'} }src={`${process.env.SITE_IMAGE_PATH}${data[id].thumb_preview}_thumb.jpg`} /> 
            </CardContent>
            <CardActions style={{ textAlign: 'right' }}>
                <EditButton resource="posts" basePath={basePath} record={data[id]} />
            </CardActions>
        </Card>
        )}
    </div>
)*/

/*
<CategoryGrid ids={props.ids} data={props.data} basePath={props.basePath}/>
<Datagrid>
                <BooleanField source="published" />
                <TextField source="title" />
                <TextField source="slug" />
                <ReferenceField label="Categoria padre" source="parent" reference="category">
                    <ChipField source="category_name" />
                </ReferenceField>
                <EditButton basePath="/category" />
            </Datagrid>*/

const CategoryList = (props) => {
    return (
        <List {...props} exporter={false} filters={<CategoryFilter />}>
            <Datagrid>
                <BooleanField source="published" />
                <TextField source="title" />
                <TextField source="slug" />
                <TextField source="ord" />
                <ReferenceField label="Categoria padre" source="parent" reference="category">
                    <ChipField source="category_name" />
                </ReferenceField>
                <EditButton basePath="/category" />
            </Datagrid>
        </List>
        )
    };

export default CategoryList;