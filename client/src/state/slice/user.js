import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import { fetchApi } from '../../utils/fetchApi.js';

const initialState = {
  user: {
    username: '', 
    nickname: '', 
    _id: '', 
    core: {
      highest: 0, 
      current: 0
    }, 
    streak: {
      highest: 0, 
      current: 0
    }
  },
  hasUnreadNotifications: false,
 interest: [],
  isAuthenticated: false, 
  isLoading: false, 
  error: '', 

  isProcessOK: false
}

export const getSession = createAsyncThunk("session", async(_,thunkAPI) => {
  try{
    const res = await fetchApi("post", "/user/session");
 
    
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
            state.hasUnreadNotifications = false
      state.error = '';
      state.isProcessOK = false;
    })
    builder.addCase(getSession.fulfilled, (state, action) => {
      state.user = action?.payload?.user || {};
      state.hasUnreadNotifications = action?.payload?.hasUnreadNotifications || false;
      state.isAuthenticated = true; 
      state.error = '';
      state.interest = action?.payload?.interests
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