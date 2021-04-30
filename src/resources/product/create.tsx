import * as React from 'react';
import { 
    required,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,
    Create,
    TextInput,
    ReferenceInput,
    TabbedForm,
    FormTab,
    BooleanField,
    ImageInput,
    ImageField,
    DateField
} from 'react-admin';

import { TextField } from '@material-ui/core';

import RichTextInput from 'ra-input-rich-text';

import ImgField from '../../components/imgField'

const ProductCreate = (props) => (
	<Create title="Create a Post" {...props}>
		<TabbedForm>
				<FormTab label="Generali">
						<BooleanField source="published" />
						<TextInput source="sku" />
						<TextInput source="title" />
						<TextInput source="description" fullWidth={true} multiline={true}/>
						<RichTextInput source="body" />
						<TextField>
							<TextInput source="subtitle" />
							<RichTextInput source="subbody" />
						</TextField>
						<TextInput parse={v => v.replace(" ", "-")} source="slug" validate={required()} fullWidth={true}/>
						<TextInput source="price" />
						<DateField source="priceValidUntil" />
						<ReferenceInput label="Category" source="category" reference="category">
								<SelectInput optionText="category_name" optionValue="_id" validate={required()} />
						</ReferenceInput>
						<hr />
						<h6 className="MuiTypography-h6">Meta</h6>
						<TextInput source="meta.title" label="meta title"/>
						<TextInput source="meta.description"label="meta description" fullWidth={true}/>
						<TextInput source="meta.keywords" label="meta keywords"/>
				</FormTab>
				<FormTab label="immagini">
					<ArrayInput source="images">
							<SimpleFormIterator>
								<TextInput source="uri" label="Nome file" parse={v => v.replace(" ", "-")}/>
								<TextInput source="alt"  label="Alt"/>
								<ImageInput source="file" label={"immagine"} accept="image/*">
									<ImageField source="uri" />
								</ImageInput>
							</SimpleFormIterator>
					</ArrayInput>
				</FormTab>
		</TabbedForm>
	</Create>
);


export default ProductCreate