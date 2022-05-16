import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  isAuthorized: boolean;
}
const initialState: IUserState = {
  isAuthorized: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeAuth(state, action: PayloadAction<boolean>) {
      state.isAuthorized = action.payload;
    },
  },
});

export const { changeAuth } = userSlice.actions;
export default userSlice.reducer;
