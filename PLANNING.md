# PLANNING.md

## Project Overview

Develop a lightweight, web-based file manager with a focus on simplicity and read-only access. The application will allow users to navigate through a folder structure and download files without the ability to upload or modify them.

## Key Features

- Display hierarchical folder structures
- List files within folders
- Download files
- Read-only mode (no upload, delete, or edit functionalities)
- Responsive and intuitive UI using Ant Design

## Technology Stack

### Frontend

- React.js
- Ant Design
- Typescript

### Backend

- Node.js
- Koa.js
- Typescript

### File System Access

- Node.js `fs` module

## Folder Structure

project-root/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── app.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
├── shared/
│   └── constants/
├── .gitignore
├── package.json
└── README.md

## API Endpoints

- `GET /api/folders?path=/`  
  Retrieve list of folders and files in the specified path.

- `GET /api/download?path=/file.txt`  
  Download the specified file.
