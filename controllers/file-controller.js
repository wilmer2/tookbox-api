import { FileModel } from '../models/file-model.js'

export class FileController {
  static async getList (req, res) {
    const { data, error } = await FileModel.getList()

    if (error) return res.status(error.statusCode).json(error)

    res.json(data)
  }

  static async getData (req, res) {
    const { data: fileList, error } = await FileModel.getList()

    if (error) return res.state(error.statusCode).json(error)

    res.json({ message: JSON.stringify(fileList) })
  }
}
