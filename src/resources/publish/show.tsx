import * as React from 'react';
import dataProvider from '../../provider/dataProvider';
import { makeStyles } from '@material-ui/core/styles';
import { Loading } from 'react-admin';
import {
  Button,
  Paper
} from '@material-ui/core' 


interface State {
  loading: boolean;
  items: any;
}

class Show extends React.Component<{}, State> {

  state = {
    loading: false,
    items: []
  };

  async publishAll(e) {
    e.preventDefault()
    this.setState({
      loading: true
    })
    const data = await dataProvider.publish({})
    this.setState({
      items: data.filesUploaded,
      loading: false
    })
  }

  async publishModified(e) {
    e.preventDefault()
    this.setState({
      loading: true
    })
    const data = await dataProvider.publish({unpublished: true})
    this.setState({
      items: data.filesUploaded,
      loading: false
    })
  }

  clear() {
    this.setState({
      items: []
    })
  }

  
  render() {

    const { items, loading  } = this.state  

    return (
      <Paper elevation={3} style={{padding: 10}}>
        <h1 className="MuiTypography-h3">Pubblica</h1>
        {loading && <Loading loadingPrimary="Pubblicazione in corso" />}
        <Button variant="contained" color="secondary" onClick={this.clear.bind(this)}>Clear</Button>
        <Button variant="contained" color="primary" onClick={this.publishAll.bind(this)}>Pubblica tutto</Button>
        <Button variant="contained" color="primary" onClick={this.publishModified.bind(this)}>Pubblica modificati</Button>
        <ul>
        {
          items.map((item, index) => {
            return (<li key={index}>{item}</li>)
          })
        }
        </ul>
      </Paper>
    )
  }

}

export default Show