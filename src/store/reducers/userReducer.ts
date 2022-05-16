import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getToken from '../../services/helpers/getToken';

interface IUserState {
  isAuthorized: boolean;
  token: string;
}
const initialState: IUserState = {
  isAuthorized: Boolean(getToken()),
  token: getToken(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeAuth(state, action: PayloadAction<boolean>) {
      state.isAuthorized = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { changeAuth, setToken } = userSlice.actions;
export default userSlice.reducer;
