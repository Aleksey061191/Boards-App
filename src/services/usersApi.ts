import ApiService from './apiService';
import { IAuthSignUpParams } from './authApi';

export interface IResponseApi {
  id: string;
  name: string;
  login: string;
}

const usersApi = {
  getAllUsers: () => ApiService.get(`users`),
  getUser: (id: string) => ApiService.get(`users/${id}`),
  updateUser: (id: string, user: IAuthSignUpParams) => ApiService.put(`users/${id}`, user),
  deleteUser: (id: string) => ApiService.delete(`users/${id}`),
};

export default usersApi;
