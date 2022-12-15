import express from 'express'
import { BorrowingController } from '../controllers/borrowing.controller';

const borrowingRouter = express.Router()

borrowingRouter.route('/getBorrowedBooks').post(
    (req,res)=>new BorrowingController().getBorrowedBooks(req,res)
)

borrowingRouter.route('/getAllUserBorrowedBooks').post(
    (req,res)=>new BorrowingController().getAllUserBorrowedBooks(req,res)
)

borrowingRouter.route('/isBorrowedBoook').post(
    (req,res)=>new BorrowingController().isBorrowedBoook(req,res)
)

borrowingRouter.route('/getAllBorrowingRequests').post(
    (req,res)=>new BorrowingController().getAllBorrowingRequests(req,res)
)

borrowingRouter.route('/getBorrowingByBookAndUser').post(
    (req,res)=>new BorrowingController().getBorrowingByBookAndUser(req,res)
)

borrowingRouter.route('/insertBorrowing').post(
    (req,res)=>new BorrowingController().insertBorrowing(req,res)
)

borrowingRouter.route('/setReturning').post(
    (req,res)=>new BorrowingController().setReturning(req,res)
)

borrowingRouter.route('/setExtend').post(
    (req,res)=>new BorrowingController().setExtend(req,res)
)

export default borrowingRouter;