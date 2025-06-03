const initialState = {
    menu:[],
    selectedMenu:"",
    isSidebarOpen:true
  };
  
  // Reducer function
  export function menuReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_MENU':
        return { ...state, menu: action.payload.menu ,selectedMenu: action.payload.selectedMenu};
      case 'SELECT_MENU':
        console.log("SELECT_MENU>>",action.payload);
        return { ...state, selectedMenu: action.payload };
      case 'ClOSE_MENU':
        return { ...state, isSidebarOpen:false};
      case 'OPEN_MENU':
        console.log("SELECT_MENU>>",action.payload);
        return { ...state, isSidebarOpen:true };
        
      default:
        return state;
    }
  }