import express from 'express'
import { BookReservationController } from '../controllers/book.reservation.controller';

const bookReservationRouter = express.Router()

bookReservationRouter.route('/getData').post(
    (req,res)=>new BookReservationController().getData(req,res)
)

bookReservationRouter.route('/insertReservation').post(
    (req,res)=>new BookReservationController().insertReservation(req,res)
)

bookReservationRouter.route('/updateStatus').post(
    (req,res)=>new BookReservationController().updateStatus(req,res)
)

bookReservationRouter.route('/isReserved').post(
    (req,res)=>new BookReservationController().isReserved(req,res)
)

bookReservationRouter.route('/getAccepttedReservations').post(
    (req,res)=>new BookReservationController().getAccepttedReservations(req,res)
)

export default bookReservationRouter;