import { httpClient } from '../adapters/http-client.adapter.js'

export class FileModel {
  static async getList () {
    const response = await httpClient.get('/files')

    return response?.data
  }
}
