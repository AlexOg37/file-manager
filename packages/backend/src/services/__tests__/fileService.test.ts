jest.mock('fs', () => ({
  promises: {
    readdir: jest.fn().mockImplementation(() => Promise.resolve([])),
    stat: jest.fn().mockImplementation(async (path) => ({
      isFile: () => true,
      size: 1024,
      mtime: new Date()
    })),
    readFile: jest.fn().mockImplementation(() => Promise.resolve(Buffer.from(''))),
  }
}))

import { FileService } from '../fileService'
import path from 'path'
import { jest, describe, beforeEach, afterEach, it, expect } from '@jest/globals'

describe('FileService', () => {
  let fileService: FileService
  const mockBasePath = '/test/base/path'

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.FILE_MANAGER_ROOT = mockBasePath
    fileService = new FileService()
  })

  afterEach(() => {
    delete process.env.FILE_MANAGER_ROOT
  })

  describe('getDirectoryContents', () => {
    it('should return directory contents correctly', async () => {
      const mockEntries = [
        { name: 'file1.txt', isDirectory: () => false, isFile: () => true },
        { name: 'dir1', isDirectory: () => true, isFile: () => false }
      ]

      const mockStats = {
        size: 1024,
        mtime: new Date()
      }

      const { readdir, stat } = jest.mocked(require('fs').promises)
      readdir.mockResolvedValueOnce(mockEntries)
      stat.mockResolvedValue(mockStats)

      const result = await fileService.getDirectoryContents('testDir')

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({
        name: 'file1.txt',
        path: path.join('testDir', 'file1.txt'),
        type: 'file',
        size: 1024,
        modifiedTime: mockStats.mtime
      })
      expect(result[1]).toEqual({
        name: 'dir1',
        path: path.join('testDir', 'dir1'),
        type: 'directory',
        size: undefined,
        modifiedTime: mockStats.mtime
      })
    })

    it('should reject paths outside base directory', async () => {
      const pathStartsWithParentFolderAccess = '../outside'
      const pathContainsParentFolderAccess = 'testDir/../../outside'
      const pathStartsWithRootAccess = '/testDir/outside'

      const testPromises = [
        pathStartsWithParentFolderAccess,
        pathContainsParentFolderAccess,
        pathStartsWithRootAccess
      ].map((testFalsePath) =>
        expect(fileService.getDirectoryContents(testFalsePath)).rejects.toThrow(
        'Access denied: Path is outside of allowed directory'
      ))
      await Promise.all(testPromises)
    })
  })

  describe('getFile', () => {
    it('should return file content correctly', async () => {
      const mockContent = Buffer.from('test content')
      const mockStats = {
        isFile: () => true,
        size: 1024,
        mtime: new Date()
      }

      const { stat, readFile } = jest.mocked(require('fs').promises)
      stat.mockResolvedValueOnce(mockStats)
      readFile.mockResolvedValueOnce(mockContent)

      const result = await fileService.getFile('test.txt')

      expect(result).toEqual({
        name: 'test.txt',
        content: mockContent
      })
    })

    it('should throw error when path is not a file', async () => {
      const mockStats = {
        isFile: () => false,
        size: 0,
        mtime: new Date()
      }

      const { stat } = jest.mocked(require('fs').promises)
      stat.mockResolvedValueOnce(mockStats)

      await expect(fileService.getFile('directory')).rejects.toThrow('Not a file')
    })

    it('should reject paths outside base directory', async () => {
      await expect(fileService.getFile('../outside.txt')).rejects.toThrow(
        'Access denied: Path is outside of allowed directory'
      )
    })
  })
})
