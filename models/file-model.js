import { httpClient } from '../adapters/http-client.adapter.js'

export class FileModel {
  static async getList () {
    const result = { data: null, error: null }
    let response

    try {
      response = await httpClient.get('/files')
    } catch (err) {
      console.log('*** err ***', err)
      const message = 'No se pudo procesar la solicitud de archivos'
      const statusCode = err.response ? err.response.status : 500

      result.error = { statusCode, message }

      return result
    }

    result.data = response.data

    return result
  }
}
