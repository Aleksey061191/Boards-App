import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getToken from '../../services/helpers/getToken';

interface IUserState {
  isAuthorized: boolean;
  token: string;
  login: string;
}
const initialState: IUserState = {
  isAuthorized: Boolean(getToken()),
  token: getToken(),
  login: localStorage.getItem('login') || '',
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
    setLogin(state, action: PayloadAction<string>) {
      state.login = action.payload;
    },
  },
});

export const { changeAuth, setToken, setLogin } = userSlice.actions;
export default userSlice.reducer;
