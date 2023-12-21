import express from 'express'
import { FileController } from '../controllers/file-controller.js'
export const fileRouter = express.Router()

const fileController = new FileController()

fileRouter.get('/list', fileController.getList)

fileRouter.get('/data', fileController.getData)
