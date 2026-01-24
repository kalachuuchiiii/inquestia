import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "@/lib/axios.instance.js";
import {
  INTEREST_ENUM,
  USER_BADGES,
  type SessionResponse,
  type UserDTO,
} from "@shared/index.js";

const user: UserDTO & {
  email: string;
  boosterPoint: number;
  interests: (typeof INTEREST_ENUM)[number][];
} = {
  username: "",
  nickname: "",
  avatar: undefined,
  _id: "",
  displayName: "",
  email: "",
  bio: "",
  badge: USER_BADGES[0],
  boosterPoint: 0,
  interests: ["personal"],
  core: {
    highest: 0,
    current: 0,
  },
  streak: {
    current: 0,
    highest: 0,
  },
  socialLinks: [],
};
export const initialState = {
  user,
  hasUnreadNotifications: false,
  accessToken: "",
  isLoading: false,
};

export const getSession = createAsyncThunk("session", async (_, thunkAPI) => {
  try {
    const res = await API.get<SessionResponse>("/api/auth/session");
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue("");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload.user;
    },
    resetState: (state) => {
      state.user = initialState.user;
      state.isLoading = false;
    },
    renewAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSession.pending, (state) => {
      state.user = initialState.user;
      state.isLoading = true;
      state.hasUnreadNotifications = false;
    });
    builder.addCase(getSession.fulfilled, (state, action) => {
      const { user, hasUnreadNotifications, accessToken } = action.payload;
      state.user = user ?? {};
      state.hasUnreadNotifications = hasUnreadNotifications ?? false;
      state.accessToken = accessToken;
      state.isLoading = false;
    });
    builder.addCase(getSession.rejected, (state) => {
      state.user = initialState.user;
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
export const { updateUser, resetState, renewAccessToken } = userSlice.actions;
