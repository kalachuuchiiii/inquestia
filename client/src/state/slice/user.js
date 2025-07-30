import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 

const initialState = {
  username: '', 
  _id: '', 
  avatar: '', 
  streak: {
    currentStreak: 0, 
    highestStreak: 0
  }, 
  nickname: ''
}

export const getUser = () => {

}


const userSlice = createSlice({
  name: 'user', 
  initialState, 
  reducers: {}, 
  extraReducers: (builder) => {
    
    
  }
})

export default userSlice.reducer;