import { FileModel } from '../models/file-model.js'

export class FileService {
  async getAllFiles () {
    const result = { data: null, error: null }

    try {
      result.data = await FileModel.getList()
    } catch (err) {
      const message = 'No se pudo procesar la solicitud de archivos'
      const statusCode = err.response ? err.response.status : 500

      result.error = { statusCode, message }

      return result
    }

    return result
  }
}
