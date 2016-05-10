import { connect } from 'react-redux';
import React, {Component} from 'react';

class Item extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.markItem(this.props.id);
  }

  render() {
    const {id, marked} = this.props.item;
    const bgColor = marked ? '#ECF0F1' : '#fff';
    return (
      <div
        style={{
          padding:'20px',
          border: '1px solid',
          fontSize: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: bgColor,
          height: "20px"
        }}
        onClick={this.onClick}
      >
        {id}
      </div>
    );
  }
}

function mapStateToProps(state, initialProps) {
  const { id } = initialProps;
  // return (state) => {
    const { items } = state;
    return {
      item: items[id],
    };
  // }
}

const markItem = (id) => ({type: 'MARK', id});

export default connect(mapStateToProps, {markItem})(Item);
