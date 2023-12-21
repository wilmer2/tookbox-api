import { FileService } from '../services/file-service.js'

export class FileController {
  constructor () {
    this.fileService = new FileService()
  }

  getList = async (req, res) => {
    const { data, error } = await this.fileService.getAllFiles()

    if (error) return res.status(error.statusCode).json(error)

    res.json(data.files)
  }

  getData = async (req, res) => {
    const { data, error } = await this.fileService.getAllFiles()

    if (error) return res.state(error.statusCode).json(error)

    const { files } = data

    const { data: csvList, error: errorStream } = await this.fileService.getFilesData(files)

    if (errorStream) return res.state(errorStream.statusCode).json(errorStream)

    res.json(csvList)
  }
}
