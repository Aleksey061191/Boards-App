import ApiService from './apiService';

export interface IBoardParams {
  title: string;
  description?: string;
}

export interface IBoardUpdateParams extends IBoardParams {
  id: string;
}
const boardsApi = {
  getAllBoards: () => ApiService.get(`boards`),
  getBoard: (id: string) => ApiService.get(`boards/${id}`),
  createBoard: (board: IBoardParams) => ApiService.post(`boards`, board),
  updateBoard: (id: string, board: IBoardParams) => ApiService.put(`boards/${id}`, board),
  deleteBoard: (id: string) => ApiService.delete(`boards/${id}`),
};

export default boardsApi;
