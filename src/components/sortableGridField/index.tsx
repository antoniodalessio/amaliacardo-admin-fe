import * as React from 'react';

import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import dataProvider from '../../provider/dataProvider';

//import * as s from './style.css'

interface Props {
  sortKey: string;
  record?: any;
  resources: string;
  parentResources: string;
  items?: any;
}

class SortableGridField extends React.Component<Props> {

  state = {
    items: [],
  };

  async componentDidMount() {

    if (this.props.items) {

      const { items } = this.props

      items.sort(function(a, b) {
        return a.ord - b.ord;
      });

      this.setState({items})
    }else{
      const payload = {
        pagination: { page: 1, perPage: 0 },
        sort: { field: this.props.sortKey, order: 'ASC' },
        filter: {
          [this.props.parentResources] : this.props.record._id
        }
      };
      
      const data = await dataProvider.getList(this.props.resources, payload)
      this.setState({
        items: data.data
      })
    }
  }
  
  onSortEnd = async ({oldIndex, newIndex}) => {

    this.setState( () => ({items: arrayMove(this.state.items, oldIndex, newIndex)}), async () =>{
    
      this.state.items.forEach((item, index) => {
        item.ord = index
      })

      for(const item of this.state.items) {
        await dataProvider.update(this.props.resources, 
          {
            id: item._id,
            data: item,
            previousData: null
          })
      }

      const categoryCopy = Object.assign({}, this.props.record)
      categoryCopy.published = false

      await dataProvider.update(this.props.parentResources, {id: categoryCopy._id, data: categoryCopy, previousData: null})
      
    });
  };

  render() {

    return(
      <SortableList 
        items={this.state.items}
        onSortEnd={this.onSortEnd}
        axis="xy"
        helperClass="SortableHelper"
        type={this.props.resources}
      />
    )
  }
}


export default SortableGridField



const gridStyle = {
  display: 'flex',
  flexWrap: "wrap",
  listStyleType: 'none'
} as React.CSSProperties;

const elementStyle = {
  width: '18%',
  border: "1px solid #ccc",
  marginRight: "1%",
  marginBottom: "1%",
  visibility: "visible"
} as React.CSSProperties;

const imgStyle = {
  width: '100%'
} as React.CSSProperties;

const SortableItem = SortableElement(({value}) => { 
  
  
  let imageName = ""
  
  if (value.hasOwnProperty('images')) {
    imageName = `${value.images[0].uri}_thumb.jpg`
  }else {
    imageName = `${value.uri}_thumb.jpg`
  }
  const uri = `http://www.amaliacardo.it/images/work/${imageName}`
  return(<li style={elementStyle}><img style={imgStyle} src={uri}></img></li>)
});


const SortableList = SortableContainer(({items, type}) => {
  return (
    <ul style={gridStyle}>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});


