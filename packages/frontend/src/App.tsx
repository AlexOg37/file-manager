import { useState, useEffect } from 'react';
import { Layout, message, Spin } from 'antd';
import './App.css';
import Navigation from './components/Navigation';
import FileList from './components/FileList';
import type { FileItem } from './services/api';
import api from './services/api';

const { Header, Content } = Layout;

function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFiles = async (path: string) => {
    try {
      setLoading(true);
      const data = await api.listFiles(path);
      setFiles(data);
    } catch (error) {
      message.error('Failed to load files');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles(currentPath);
  }, [currentPath]);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const handleDownload = async (path: string) => {
    try {
      const blob = await api.downloadFile(path);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = path.split('/').pop() || 'file';
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      message.error('Failed to download file');
      console.error(error);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px' }}>
        <h1>File Manager</h1>
      </Header>
      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>
          <Navigation path={currentPath} onNavigate={handleNavigate} />
          <div style={{ marginTop: '24px' }}>
            <Spin spinning={loading}>
              <FileList
                files={files}
                currentPath={currentPath}
                onNavigate={handleNavigate}
                onDownload={handleDownload}
              />
            </Spin>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default App
