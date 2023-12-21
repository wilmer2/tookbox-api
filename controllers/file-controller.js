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

    if (error) return res.status(error.statusCode).json(error)

    const { fileName } = req.query
    const { files } = data
    const selectedFiles = fileName ? files.filter((file) => file === fileName) : files

    const { data: csvList, error: errorStream } = await this.fileService.getFilesData(selectedFiles)

    if (errorStream) return res.status(errorStream.statusCode).json(errorStream)

    res.json(csvList)
  }
}
