import * as React from 'react';
import dataProvider from '../../provider/dataProvider';
import {uniq} from 'lodash'
//const dot = require('dot-object');

import { object } from 'dot-object'

import {
  Card
} from '@material-ui/core' 

const container = {
  display: 'flex',
  justifyContent: 'center'

} as React.CSSProperties;

const itemsContainer = {
  borderRight: '1px solid black',
  padding: '10px',
  width: '49%',
} as React.CSSProperties;

const allItemsContainer = {
  padding: '10px',
  width: '49%',
}


interface Props {
  record?: any;
  source: string;
}

interface State {
  items?: any;
  allItems?: any;
}

class Swapper extends React.Component<Props, State> {

  state: State = {
    items: [],
    allItems: []
  };

  async componentDidMount() {

    const items = this.props.source.split('.').reduce((o, i) => o[i], this.props.record)

    this.setState({
      items: Object.assign([], items)
    })
    await this.getAll()
  }

  async getAll() {
    const params = {
        pagination: {page: 0, perPage: 0},
        sort: {field: 'ord', order: 'ASC' },
        filter: {}
    }

    const items = await dataProvider.getList('fabric', params)

    this.setState({
      allItems: items.data
    })
  }

  async update(items) {

    if (this.props.record.fabrics.length || this.props.record.fabrics.length == 0) {
      this.props.record.fabrics = {}
    }

    const objSplit = this.props.source.split(".")

    this.props.record[objSplit[0]][objSplit[1]] = items

    await dataProvider.update('product', 
      {
        id: this.props.record._id,
        data: object(this.props.record),
        previousData: null
      })
  }

  onAdd(item) {
    this.state.items.push(item)
    const items = this.state.items.filter((thing, index, self) =>
    index === self.findIndex((t) => (
      t._id === thing._id
    ))
  )
    this.setState({items}, () => { this.update(this.state.items) })
  }

  onRemove(item) {
    const items = this.state.items.filter((el) => item._id != el._id)
    this.setState({items}, () => { this.update(this.state.items) })
  }

  render() {

    const { items, allItems } = this.state

    return(
        <div style={container}>
          <div style={itemsContainer}>
            <h5 className="MuiTypography-h5">Tessuti del prodotto</h5>
            {items.map( (item, index) => {
              return (
                <span style={{marginRight: 10, marginBottom: 10,  display: 'inline-block'}} key={index} onClick={this.onRemove.bind(this, item)} >
                  <img width={100}  src={process.env.SITE_IMAGE_PATH + item.thumb_preview + "_thumb.jpg"} />
                </span>
              )
            })}
          </div>
          <div style={allItemsContainer}>
            <h5 className="MuiTypography-h5">Tutti i tessuti</h5>
            {allItems.map( (item, index) => {
              return (
                <span style={{marginRight: 10, marginBottom: 10,  display: 'inline-block'}} key={index} onClick={this.onAdd.bind(this, item)} >
                  <img width={100}  src={process.env.SITE_IMAGE_PATH + item.thumb_preview + "_thumb.jpg"} />
                </span>
              )
            })}
          </div>
        </div>
    )
  }
}


export default Swapper