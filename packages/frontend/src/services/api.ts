import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/files';

export interface FileItem {
  name: string;
  type: 'file' | 'directory';
  size?: number;
  modifiedTime?: string;
}

export const api = {
  async listFiles(path: string = '/'): Promise<FileItem[]> {
    const response = await axios.get(`${API_BASE_URL}${path}`);
    return response.data;
  },

  async downloadFile(path: string): Promise<Blob> {
    const response = await axios.get(`${API_BASE_URL}/download${path}`, {
      responseType: 'blob'
    });
    return response.data;
  }
};

export default api;
