import express from 'express'
import { FileController } from '../controllers/file-controller.js'
export const fileRouter = express.Router()

fileRouter.get('/list', FileController.getList)

fileRouter.get('/data', FileController.getData)
