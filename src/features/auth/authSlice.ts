import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { EStatus } from "../../common/interface";
import { fakeLogin } from "./authAPI";
import { ILoginPayload, IUser } from "./interface";

export interface AuthState {
  user: IUser | null;
  status: EStatus;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  status: EStatus.IDLE,
}

export const login: AsyncThunk<IUser, ILoginPayload, {}> = createAsyncThunk(
  "auth/login",
  async (payload: ILoginPayload) => {
    const user = await fakeLogin(payload);
    return user;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.clear();
    },
    authenticateUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    }
  },
  //Demo async thunk using RTK slice
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, state => {
        state.status = EStatus.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = EStatus.IDLE;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, payload) => {
        state.user = null;
        state.isLoggedIn = false;
        state.status = EStatus.FAILED;
      })
  }
});

export const { logout, authenticateUser } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;