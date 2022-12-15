import express from 'express'
import { BookRequestController } from '../controllers/book.request.controller';

const bookRequestRouter = express.Router()

bookRequestRouter.route('/insert').post(
    (req,res)=>new BookRequestController().insertRequest(req,res)
)

bookRequestRouter.route('/getId').get(
    (req,res)=>new BookRequestController().getId(req,res)
)

bookRequestRouter.route('/getAllRequests').get(
    (req,res)=>new BookRequestController().getAllRequests(req,res)
)

bookRequestRouter.route('/delete').post(
    (req,res)=>new BookRequestController().delete(req,res)
)

export default bookRequestRouter;