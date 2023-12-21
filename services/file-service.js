import { FileModel } from '../models/file-model.js'
import { StreamService } from './stream-service.js'
import mapCsvToData from '../utils/mappers/mapCsvToData.js'

export class FileService {
  constructor () {
    this.streamService = new StreamService()
  }

  getAllFiles = async () => {
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

  getCsvRows = async (fileNames) => {
    const filePromises = fileNames.map(async (fileName) => {
      let response

      try {
        response = await FileModel.getFileData(fileName)
      } catch (error) {
        return null
      }
      return this.streamService.processCSVStream(response)
    })

    return await Promise.all(filePromises)
  }

  getFilesData = async (fileNames) => {
    const result = { data: null, error: null }
    let csvRows

    try {
      csvRows = await this.getCsvRows(fileNames)
    } catch (err) {
      const message = 'No se pudo procesar la solicitud de archivos'
      const statusCode = err.response ? err.response.status : 500

      result.error = { statusCode, message }

      return result
    }

    result.data = mapCsvToData(csvRows)

    return result
  }
}
