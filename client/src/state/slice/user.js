import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import { fetchApi } from '../../utils/fetchApi.js';

const initialState = {
  user: {
    username: '', 
    nickname: '', 
    _id: '', 
    point: {
      highest: 0, 
      current: 0
    }, 
    streak: {
      highest: 0, 
      current: 0
    }
  },
  interests: ["personal"],
  isAuthenticated: false, 
  isLoading: false, 
  error: '', 
  isProcessOK: false
}

export const getSession = createAsyncThunk("session", async(_,thunkAPI) => {
  try{
    const res = await fetchApi("post", "/user/session");
    console.log(res);
    
    return res;
  }catch(e){
    return thunkAPI.rejectWithValue("");
  }
})




const userSlice = createSlice({
  name: 'user', 
  initialState, 
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload.user;
    }, 
    resetState: (state) => {
      state.user = initialState.user;
      state.isAuthenticated = false; 
      state.isLoading = false; 
      state.error = ''; 
      state.isProcessOK = false;
    }
  }, 
  extraReducers: (builder) => {
    builder.addCase(getSession.pending, (state) => {
      state.user = initialState.user;
      state.isLoading = true;
      state.error = '';
      state.isProcessOK = false;
    })
    builder.addCase(getSession.fulfilled, (state, action) => {
      state.user = action?.payload?.user || {};
      state.isAuthenticated = true; 
      state.error = '';
      state.isLoading = false;
      state.isProcessOK = true;
    })
    builder.addCase(getSession.rejected, (state) => {
      state.user = initialState.user;
      state.isLoading = false;
      state.error = ''
      state.isAuthenticated = false;
      state.isProcessOK = true;
    })

  

    
    
  }
})

export default userSlice.reducer;
export const { updateUser, resetState } = userSlice.actions;