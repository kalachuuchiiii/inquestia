import { configureStore } from '@reduxjs/toolkit'; 
import userReducer from './slice/user.js';
import themeReducer from './slice/theme.js';


const store = configureStore({
  reducer: {
    user: userReducer, 
    theme: themeReducer
  }
})
 
 
 export default store;