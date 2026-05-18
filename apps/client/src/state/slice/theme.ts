import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDark:
      String(localStorage.getItem("isDark")) === ""
        ? true
        : String(localStorage.getItem("isDark")) === "true",
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
    changeTheme: (state, action) => {
      const isDark = String(action.payload) === "true" ? true : false;
      state.isDark = isDark;
      localStorage.setItem("isDark", String(isDark));
    },
  },
});

export const { toggleTheme, changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
