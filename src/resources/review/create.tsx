import * as React from 'react';
import { 
    Create,
    TextInput,
    TabbedForm,
    FormTab,
    DateTimeInput,
    ReferenceInput,
    SelectInput,
    BooleanInput
} from 'react-admin';


const ReviewCreate = (props) => (
    <Create title="Create a Review" {...props}>
        <TabbedForm>
            <FormTab label="generali">
                <TextInput source="username" label="Nome"/>
                <TextInput source="comment" label="Commento" fullWidth={true} multiline={true}/>
                <TextInput source="city" label="Città"/>
                <BooleanInput source="approved" label="Approvato"/>
                <DateTimeInput source="publishedAt" />
                <ReferenceInput label="Prodotto" source="product" reference="product" perPage={0}>
                    <SelectInput optionText="title" optionValue="_id" />
                </ReferenceInput>
            </FormTab>
        </TabbedForm>
    </Create>
);

export default ReviewCreate