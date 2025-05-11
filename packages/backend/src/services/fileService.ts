import { promises as fs } from 'fs'
import path from 'path'

export interface FileInfo {
  name: string
  path: string
  type: 'file' | 'directory'
  size?: number
  modifiedTime?: Date
}

export interface FileContent {
  name: string
  content: Buffer
}

export class FileService {
  private basePath: string

  constructor() {
    // In production, this should be configured via environment variables
    this.basePath = process.env.FILE_MANAGER_ROOT || process.cwd()
  }

  private async validatePath(requestedPath: string): Promise<string> {
    const normalizedPath = path.normalize(requestedPath).replace(/^(\.\.(\/|\\|$))+/, '')
    const fullPath = path.join(this.basePath, normalizedPath)
    
    // Ensure the path is within the allowed directory
    if (!fullPath.startsWith(this.basePath)) {
      throw new Error('Access denied: Path is outside of allowed directory')
    }

    return fullPath
  }

  async getDirectoryContents(dirPath: string): Promise<FileInfo[]> {
    const fullPath = await this.validatePath(dirPath)
    const entries = await fs.readdir(fullPath, { withFileTypes: true })
    
    const contents = await Promise.all(
      entries.map(async (entry) => {
        const entryPath = path.join(dirPath, entry.name)
        const fullEntryPath = path.join(fullPath, entry.name)
        const stats = await fs.stat(fullEntryPath)
        
        return {
          name: entry.name,
          path: entryPath,
          type: entry.isDirectory() ? ('directory' as const) : ('file' as const),
          size: entry.isFile() ? stats.size : undefined,
          modifiedTime: stats.mtime
        }
      })
    )

    return contents
  }

  async getFile(filePath: string): Promise<FileContent> {
    const fullPath = await this.validatePath(filePath)
    const stats = await fs.stat(fullPath)
    
    if (!stats.isFile()) {
      throw new Error('Not a file')
    }
    
    const content = await fs.readFile(fullPath)
    return {
      name: path.basename(filePath),
      content
    }
  }
}
