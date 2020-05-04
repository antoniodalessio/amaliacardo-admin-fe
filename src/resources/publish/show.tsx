import * as React from 'react';
import dataProvider from '../../provider/dataProvider';

import { Loading } from 'react-admin';


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
    const data = await dataProvider.publish()
    this.setState({
      items: data.filesUploaded,
      loading: false
    })
  }

  async publishModified(e) {
    e.preventDefault()
  }

  clear() {
    this.setState({
      items: []
    })
  }
  
  render() {

    const { items, loading  } = this.state

    return (
      <div>
        <h1>Pubblica</h1>
        {loading && <Loading loadingPrimary="Pubblicazione in corso" loadingSecondari=""/>}
        <button onClick={this.clear.bind(this)}>Clear</button>
        <button onClick={this.publishAll.bind(this)}>Pubblica tutto</button>
        <button onClick={this.publishModified.bind(this)}>Pubblica modificati</button>
        <ul>
        {
          items.map((item, index) => {
            return (<li key={index}>{item}</li>)
          })
        }
        </ul>
      </div>
    )
  }

}

export default Show