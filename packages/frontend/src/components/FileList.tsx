import React from 'react';
import { Table, Button } from 'antd';
import { FileOutlined, FolderOutlined, DownloadOutlined } from '@ant-design/icons';
import type { FileItem } from '../services/api';

interface FileListProps {
  files: FileItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
  onDownload: (path: string) => void;
}

export const FileList: React.FC<FileListProps> = ({
  files,
  currentPath,
  onNavigate,
  onDownload,
}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: FileItem) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {record.type === 'directory' ? <FolderOutlined /> : <FileOutlined />}
          <span
            style={{ cursor: record.type === 'directory' ? 'pointer' : 'default' }}
            onClick={() => {
              if (record.type === 'directory') {
                onNavigate(`${currentPath}${text}/`.replace('//', '/'));
              }
            }}
          >
            {text}
          </span>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => text.charAt(0).toUpperCase() + text.slice(1),
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      render: (size?: number) => (size != null ? `${(size / 1024).toFixed(2)} KB` : '-'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: FileItem) => (
        record.type === 'file' ? (
          <Button
            icon={<DownloadOutlined />}
            onClick={() => onDownload(`${currentPath}${record.name}`.replace('//', '/'))}
          >
            Download
          </Button>
        ) : null
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={files.map((file, index) => ({ ...file, key: index }))}
      pagination={false}
    />
  );
};

export default FileList;
