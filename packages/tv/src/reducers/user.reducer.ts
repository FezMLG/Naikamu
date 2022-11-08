import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../interfaces';

interface UserReducer {
  user: User | null;
  isFetching: boolean;
}

const initialState: UserReducer = {
  user: null,
  isFetching: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserPending(state: UserReducer) {
      state.isFetching = true;
    },
    getUserFulfilled(state: UserReducer, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isFetching = false;
    },
    getUserRejected(state: UserReducer) {
      state.isFetching = false;
    },
    clearAuthenticatedUser(state: UserReducer) {
      state.user = null;
      state.isFetching = false;
    },
  },
});

export const {
  getUserPending,
  getUserFulfilled,
  getUserRejected,
  clearAuthenticatedUser,
} = userSlice.actions;

export default userSlice.reducer;
