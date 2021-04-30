import * as React from 'react';
import { 
    List,
    Datagrid,
    TextField,
    ShowButton,
    Filter,
    SearchInput,
    DateField,
    BooleanField,
    ReferenceField,
    ChipField
} from 'react-admin';



const SubmissionFilter = props => (
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


const SubmissionList = (props) => {
    return (
        <List {...props} exporter={false} filters={<SubmissionFilter />}>
            <Datagrid>
                <TextField source="text" label="text"/>
                <DateField source="requestAt" label="Scritto il" />
                <ReferenceField label="Cliente" source="customer" reference="customer">
                    <ChipField source="firstname" />
                </ReferenceField>
                <ShowButton basePath="/submission" />
            </Datagrid>
        </List>
        )
    };

export default SubmissionList;