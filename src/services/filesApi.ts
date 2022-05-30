import ApiService from './apiService';

interface IFilesParams {
  taskId: string;
  file: string;
}

const filesApi = {
  upload: (file: IFilesParams) => ApiService.post(`file`, file),
  download: (taskId: string, fileName: string) => ApiService.post(`file/${taskId}/${fileName}`),
};

export default filesApi;
