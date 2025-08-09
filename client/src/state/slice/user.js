import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import { fetchApi } from '../../utils/fetchApi.js';

const initialState = {
  user: {
    username: '', 
    streak: {}, 
    nickname: '', 
    _id: ''
  },
  isAuthenticated: false, 
  isLoading: false, 
  error: ''
}

export const getSession = createAsyncThunk("session", async(_,thunkAPI) => {
  try{
    const res = await fetchApi("post", "/user/session", {});
    return res;
  }catch(e){
    console.log("e", e);
    return thunkAPI.rejectWithValue("");
  }
})


const userSlice = createSlice({
  name: 'user', 
  initialState, 
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload.user;
    }
  }, 
  extraReducers: (builder) => {
    builder.addCase(getSession.pending, (state) => {
      state.user = initialState.user;
      state.isLoading = true;
      state.error = '';
    })
    builder.addCase(getSession.fulfilled, (state, action) => {
      state.user = action?.payload?.user || {};
      state.isAuthenticated = true; 
      state.error = '';
      state.isLoading = false;
    })
    builder.addCase(getSession.rejected, (state, action) => {
      state.user = initialState.user;
      state.error = action?.payload?.message || "Internal Server Error";
      state.isLoading = false;
      state.isAuthenticated = false;
    })
    
    
  }
})

export default userSlice.reducer;
export const { updateUser } = userSlice.actions;