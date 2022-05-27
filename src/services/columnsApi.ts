import ApiService from './apiService';

interface IColumnsParams {
  title: string;
}

interface IColumnUpdateParams extends IColumnsParams {
  order: number;
}

export interface IUpdateColumnParams extends IColumnUpdateParams {
  boardId: string;
  columnId: string;
}

export interface ICreateColumnParams extends IColumnsParams {
  boardId: string;
}

export interface IDeleteColumnParams {
  id: string;
  boardId: string;
}

const columnsApi = {
  getAllColumns: (boardId: string) => ApiService.get(`boards/${boardId}/columns`),
  getColumn: (boardId: string, columnId: string) =>
    ApiService.get(`boards/${boardId}/columns/${columnId}`),
  createColumn: (boardId: string, column: IColumnsParams) =>
    ApiService.post(`boards/${boardId}/columns`, column),
  updateColumn: (boardId: string, columnId: string, column: IColumnUpdateParams) =>
    ApiService.put(`boards/${boardId}/columns/${columnId}`, column),
  deleteColumn: (boardId: string, columnId: string) =>
    ApiService.delete(`boards/${boardId}/columns/${columnId}`),
};

export default columnsApi;
