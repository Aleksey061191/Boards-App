import React from 'react';
import ApiService from './apiService';

interface ITasksParams {
  title: string;
  done: boolean;
  order: number;
  description: string;
  userId: string;
}

const tasksApi = {
  getAllTasks: (boardId: string, columnId: string) =>
    ApiService.get(`boards/${boardId}/columns/${columnId}/tasks`),
  getTask: (boardId: string, columnId: string, tasksId: string) =>
    ApiService.get(`boards/${boardId}/columns/${columnId}/tasks/${tasksId}`),
  createTask: (boardId: string, columnId: string, task: ITasksParams) =>
    ApiService.post(`boards/${boardId}/columns/${columnId}`, task),
  updateTask: (boardId: string, columnId: string, tasksId: string, task: ITasksParams) =>
    ApiService.put(`boards/${boardId}/columns/${columnId}/tasks/${tasksId}`, task),
  deleteTask: (boardId: string, columnId: string, tasksId: string) =>
    ApiService.delete(`boards/${boardId}/columns/${columnId}/tasks/${tasksId}`),
};

export default tasksApi;
