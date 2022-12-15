import express from 'express'
import { LibraryController } from '../controllers/library.controller';

const libraryRouter = express.Router()

libraryRouter.route('/extend').post(
    (req,res)=>new LibraryController().setExtend(req,res)
)

libraryRouter.route('/borrow').post(
    (req,res)=>new LibraryController().setBorrow(req,res)
)

libraryRouter.route('/getData').get(
    (req,res)=>new LibraryController().getData(req,res)
)

export default libraryRouter;