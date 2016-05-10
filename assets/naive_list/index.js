import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import React, {Component} from 'react';
import App from './app';

const initial_state = [];
const STORE_SIZE = 10000;
for (let i = 0; i < STORE_SIZE; i++) {
  initial_state.push({id: i, marked: false});
}

function itemsReducer(state = initial_state, action) {
  switch (action.type) {
  case 'MARK':
    return state.map((item) =>
      action.id === item.id ? {...item, marked: !item.marked } : item
    );
  default:
    return state;
  }
}

const store = createStore(combineReducers({items: itemsReducer}));

export default class NaiveList extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
