import { connect } from 'react-redux';
import React, {Component} from 'react';

import Item from './item';

class App extends Component {
  render() {
    const { ids } = this.props;
    return (
      <div className="main" style={{overflow: 'scroll', height: '600px'}}>
        {
          ids.map(id => {
            return <Item key={id} id={id} />;
          })
        }
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {ids: state.ids};
}

export default connect(mapStateToProps)(App);
