import * as React from 'react';
import { 
    List,
    Datagrid,
    TextField,
    EditButton,
    Filter,
    SearchInput,
    DateField,
    BooleanField
} from 'react-admin';



const ReviewFilter = props => (
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


const ReviewList = (props) => {
    return (
        <List {...props} exporter={false} filters={<ReviewFilter />}>
            <Datagrid>
                <TextField source="username" label="Username"/>
                <TextField source="comment"  label="Commento"/>
                <BooleanField source="approved"  label="Approvato"/>
                <DateField source="publishedAt" label="Scritto il" />
                <EditButton basePath="/Review" />
            </Datagrid>
        </List>
        )
    };

export default ReviewList;