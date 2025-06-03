import { createStore } from 'redux';

// Initial state
const initialState = {
  menu:[],
  selectedMenu:""
};

// Reducer function
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_MENU':
      return { ...state, menu: action.payload.menu,selectedMenu: action.payload.selectedMenu};
    case 'SELECT_MENU':
      return { ...state, selectedMenu: action.payload };
    default:
      return state;
  }
}

// Create store
const store = createStore(counterReducer);

export default store;
