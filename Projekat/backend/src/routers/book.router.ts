import express from 'express'
import { BookController } from '../controllers/book.controller';

const bookRouter = express.Router()

bookRouter.route('/getBooksByParams').post(
    (req,res)=>new BookController().getBooksByParams(req,res)
)

bookRouter.route('/bookOfDay').get(
    (req,res)=>new BookController().bookOfDay(req,res)
)

bookRouter.route('/getTopBooks').get(
    (req,res)=>new BookController().getTopBooks(req,res)
)

bookRouter.route('/getId').get(
    (req,res)=>new BookController().getId(req,res)
)

bookRouter.route('/getUsersBooks').post(
    (req,res)=>new BookController().getUsersBooks(req,res)
)

bookRouter.route('/insert').post(
    (req,res)=>new BookController().insert(req,res)
)

bookRouter.route('/update').post(
    (req,res)=>new BookController().update(req,res)
)

bookRouter.route('/updateFreeBooks').post(
    (req,res)=>new BookController().updateFreeBooks(req,res)
)

bookRouter.route('/getBookById').post(
    (req,res)=>new BookController().getBookById(req,res)
)

bookRouter.route('/deleteBook').post(
    (req,res)=>new BookController().deleteBook(req,res)
)

bookRouter.route('/getAllBooks').get(
    (req,res)=>new BookController().getAllBooks(req,res)
)

export default bookRouter;