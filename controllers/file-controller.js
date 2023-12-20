export class FileController {
  static async getList (req, res) {
    res.json({ message: 'list from controller' })
  }

  static async getData (req, res) {
    res.json({ message: 'data' })
  }
}
