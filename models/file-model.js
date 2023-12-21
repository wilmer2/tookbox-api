import { httpClient } from '../adapters/http-client.adapter.js'

export class FileModel {
  static async getList () {
    const response = await httpClient.get('/files')

    return response?.data
  }

  static async getFileData (fileName) {
    const response = await httpClient.get(`/file/${fileName}`, { responseType: 'stream' })

    return response?.data
  }
}
