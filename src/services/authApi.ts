import ApiService from './apiService';

interface IAuthSignInParams {
  login: string;
  password: string;
}

export interface IAuthSignUpParams extends IAuthSignInParams {
  name: string;
}

const authApi = {
  signin: (user: IAuthSignInParams) =>
    ApiService.post(`signin`, user)
      .then((rez) => {
        return rez;
      })
      .catch((err) => err),
  signup: (user: IAuthSignUpParams) => ApiService.post(`signup`, user),
};

export default authApi;
