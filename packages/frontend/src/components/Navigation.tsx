import React from 'react';
import { Breadcrumb } from 'antd';
import { FolderOutlined, HomeOutlined } from '@ant-design/icons';

interface NavigationProps {
  path: string;
  onNavigate: (path: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ path, onNavigate }) => {
  const parts = path.split('/').filter(Boolean);
  
  const items = [
    {
      title: (
        <span onClick={() => onNavigate('/')} style={{ cursor: 'pointer' }}>
          <HomeOutlined /> Home
        </span>
      ),
    },
    ...parts.map((part, index) => {
      const currentPath = '/' + parts.slice(0, index + 1).join('/') + '/';
      return {
        title: (
          <span onClick={() => onNavigate(currentPath)} style={{ cursor: 'pointer' }}>
            <FolderOutlined /> {part}
          </span>
        ),
      };
    }),
  ];

  return <Breadcrumb items={items} />;
};

export default Navigation;
