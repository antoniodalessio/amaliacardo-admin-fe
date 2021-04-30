import * as React from 'react';
import { Field } from 'react-final-form';

import { 
  ImageInput,
  ImageField,
  TextInput,
  required,
  FormDataConsumer
} from 'react-admin';


import {
  FormControlLabel,
  Switch,
  Box,
} from '@material-ui/core' 

interface Props {
  source: string;
  sourceAlt?: string;
  label: string;
  fieldKey: string;
  formData: any;
  sourceName: string;
};

interface State {
  sameNameCheck: boolean;
  imgName: string;
}

 
class ImgField extends React.Component<Props, State> {

  state = {
    sameNameCheck: false,
    imgName: ''
  }

  

  getImageData = (v: any) => {
    return `${process.env.SITE_IMAGE_PATH}${v}_thumb.jpg`
  }

  toggleChecked() {
    this.setState({
      sameNameCheck: !this.state.sameNameCheck
    })
  }

  render() {
    const { source, sourceName, label, sourceAlt, fieldKey, formData} = this.props
    const { sameNameCheck } = this.state

    console.log("formData", formData)
    
    
    if (typeof formData != 'undefined' && formData.hasOwnProperty(fieldKey) && typeof formData[fieldKey] == "string") {
      formData.imgName = (' ' + formData[fieldKey]).slice(1)
      formData[fieldKey] = {
        uri: this.getImageData(formData[fieldKey]),
        rawFile: new File([null], formData.imgName)
      }
    }

    return (
      <div>
        <TextInput
          fullWidth
          label="Nome immagine"
          source={sourceName}
          parse={(v) => v.replace(' ', "-")}
          disabled={sameNameCheck}
        />
        {sourceAlt && <TextInput fullWidth  
          source={sourceAlt} 
          label="Alt"
        />}
        {typeof formData != 'undefined' && typeof formData[fieldKey] != 'string' &&
        <ImageInput source={source} label={label} accept="image/*" multiple={true}>
          <ImageField source="uri" />
        </ImageInput>
        }
      </div>
    )
  }
}

export default ImgField


/*

{formData[fieldKey] && formData[fieldKey].rawFile && formData[fieldKey].rawFile.size && 
          <Box border={1} style={{padding: 10}}>
            <FormControlLabel
              control={<Switch  checked={sameNameCheck} onChange={this.toggleChecked.bind(this)} />}
              label="Stesso nome del file caricato"
            />
            <p className="MuiFormLabel-root">
            Al momento di caricare una nuova immagine è possibile scegliere se usare il nome del file caricato o dargli un nuovo nome
            </p>
          </Box>
        }


*/