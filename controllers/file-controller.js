import { FileService } from '../services/file-service.js'

export class FileController {
  constructor () {
    this.fileService = new FileService()
  }

  getList = async (req, res) => {
    const { data, error } = await this.fileService.getAllFiles()

    if (error) return res.status(error.statusCode).json(error)

    res.json(data)
  }

  getData = async (req, res) => {
    const { data: fileList, error } = await this.fileService.getAllFiles()

    if (error) return res.state(error.statusCode).json(error)

    res.json({ message: JSON.stringify(fileList) })
  }
}
