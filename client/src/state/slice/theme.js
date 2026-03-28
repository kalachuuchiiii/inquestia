import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: 'theme', 
  initialState: {       
    mode: localStorage.getItem('theme') || 'Light'
  },
reducers: {
    toggleTheme: (state) => {
        state.mode = state.mode === 'Light' ? 'Dark' : 'Light'
     }, 
     changeTheme: (state, action) => {

      const validThemes = ['Light', 'Dark'];
      if (validThemes.includes(action.payload)){
             state.mode = action.payload;
             localStorage.setItem('theme', action.payload)
      }
    }
  }
    })

export const { toggleTheme, changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
