import csv from 'csv-parser'
import { FileModel } from '../models/file-model.js'

export class FileService {
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

  checkValidHexadecimal = (value) => {
    return /^[0-9a-fA-F]{32}$/.test(value)
  }

  checkValidNumber = (value) => {
    return /^\d+$/.test(value)
  }

  checkValidStreamData = (rowData) => {
    const rowValues = Object.values(rowData)
    const someIsEmpty = rowValues.some(r => r === '')
    const isValidNumber = this.checkValidNumber(rowData.number)
    const isValidHexadecimal = this.checkValidHexadecimal(rowData.hex)

    if (someIsEmpty) return false
    if (!isValidNumber) return false
    if (!isValidHexadecimal) return false

    return true
  }

  getStreamContent = (stream) => {
    return new Promise((resolve, reject) => {
      const data = []
      stream.pipe(csv())
        .on('data', (row) => {
          const { file = '', text = '', number = '', hex = '' } = row
          const rowData = { file, text, number, hex }

          if (this.checkValidStreamData(rowData)) {
            data.push(rowData)
          }
        })
        .on('end', () => resolve(data))
        .on('err', (error) => {
          reject(error)
        })
    })
  }

  getFilesStreams = async (fileNames) => {
    const filePromises = fileNames.map(async (fileName) => {
      let response

      try {
        response = await FileModel.getFileData(fileName)
      } catch (error) {
        return null
      }
      return this.getStreamContent(response)
    })

    return await Promise.all(filePromises)
  }

  getFilesData = async (fileNames) => {
    const result = { data: null, error: null }
    let response

    try {
      response = await this.getFilesStreams(fileNames)
    } catch (err) {
      const message = 'No se pudo procesar la solicitud de archivos'
      const statusCode = err.response ? err.response.status : 500

      result.error = { statusCode, message }

      return result
    }

    result.data = response
      .filter(r => r !== null && r.length > 0)
      .flatMap(d => d)

    return result
  }
}
