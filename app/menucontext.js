// ThemeContext.js
import React from 'react';
let menuState={
    menu:[],
    selectedMenu:["test"]
}

const MenuContext = React.createContext(menuState);

export default MenuContext;