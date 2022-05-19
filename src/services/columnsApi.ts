import React from 'react';
import ApiService from './apiService';

interface IColumnsParams {
  title: string;
  order: number;
}

const columnsApi = {
  getAllColumns: (boardId: string) => ApiService.get(`boards/${boardId}/columns`),
  getColumn: (boardId: string, columnId: string) =>
    ApiService.get(`boards/${boardId}/columns/${columnId}`),
  createColumn: (boardId: string, column: IColumnsParams) =>
    ApiService.post(`boards/${boardId}/columns`, column),
  updateColumn: (boardId: string, columnId: string, column: IColumnsParams) =>
    ApiService.put(`boards/${boardId}/columns/${columnId}`, column),
  deleteColumn: (boardId: string, columnId: string) =>
    ApiService.delete(`boards/${boardId}/columns/${columnId}`),
};

export default columnsApi;
