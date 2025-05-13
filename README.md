# File Manager

A modern web-based file manager application with a React frontend and Koa.js backend, featuring a clean and intuitive user interface built with Ant Design.

## Features

- 📁 Hierarchical folder navigation
- 📋 File and folder listing with detailed information
- ⬇️ File download functionality
- 🔒 Secure read-only access
- 📱 Responsive design with Ant Design components
- 🔍 Path-based navigation with breadcrumbs

## Tech Stack

### Frontend

- React 18
- TypeScript
- Ant Design
- Vite
- Axios

### Backend

- Node.js
- Koa.js
- TypeScript
- Jest (testing)

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd file-manager
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the backend package:

     ```plaintext
     PORT=3001
     FILE_MANAGER_ROOT=/path/to/files
     ```

## Development

Run both frontend and backend in development mode:

```bash
npm run dev
```

This will start:

- Frontend at `http://localhost:5173`
- Backend at `http://localhost:3001`

### Running Individual Services

Frontend development server:

```bash
cd packages/frontend
npm run dev
```

Backend development server:

```bash
cd packages/backend
npm run dev
```

## Building for Production

Build all packages:

```bash
npm run build
```

## Testing

Run tests for all packages:

```bash
npm test
```

### Running Individual Tests

Frontend tests:

```bash
cd packages/frontend
npm test
```

Backend tests:

```bash
cd packages/backend
npm test
```

## Project Structure

```plaintext
project-root/
├── packages/
│   ├── frontend/           # React frontend application
│   │   ├── src/
│   │   │   ├── components/ # React components
│   │   │   ├── services/   # API services
│   │   │   └── App.tsx     # Root component
│   │   └── package.json
│   └── backend/            # Koa.js backend server
│       ├── src/
│       │   ├── routes/     # API routes
│       │   ├── services/   # Business logic
│       │   └── index.ts    # Server entry point
│       └── package.json
├── PLANNING.md             # Project planning and architecture
├── TASK.md                # Project tasks and progress
└── package.json           # Root package.json
```

## API Endpoints

### List Directory Contents

```plaintext
GET /api/files/list/:path*
```

Returns a list of files and folders in the specified path.

### Download File

```plaintext
GET /api/files/download/:path*
```

Downloads a file from the specified path.

## Security

- Path traversal protection
- Read-only access
- No file modification capabilities
- CORS configuration for API access

## License

ISC License
