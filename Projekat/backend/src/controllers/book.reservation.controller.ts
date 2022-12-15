import express, { Request, Response } from 'express';
import BookReservationModel from '../model/book.reservation'

export class BookReservationController {

    updateStatus = (req: Request, res: Response) => {
        BookReservationModel.updateOne({ bookId: req.body.bookId, mail: req.body.mail, date: req.body.date }, {
            $set: {
                status: req.body.status
            }
        }, (err, resp) => {
            if (err) {
                console.log(err);
                res.status(400).json({ "message": "error" })
            }
            else res.json({ "message": "correct" })
        })
    }

    getData = (req: express.Request, res: express.Response) => {
        BookReservationModel.find({ bookId: req.body.bookId, status: 'active' }, (err, reservations) => {
            if (err) { console.log(err) }
            else {
                reservations = reservations.sort(function (b, a) {
                    if (a.date < b.date) {
                      return -1;
                    }
                    if (a.date > b.date) {
                      return 1;
                    }
                    return 0;
                  });
                res.json(reservations.slice(0,req.body.number))
            }
        })
    }

    insertReservation = (req: express.Request, res: express.Response) => {
        let user = new BookReservationModel({
            bookId: req.body.bookId,
            date: req.body.date,
            mail: req.body.mail,
            status: "active",
            title: req.body.title
        })

        user.save((err, resp) => {
            if (err) {
                console.log(err);
                res.status(400).json({ "message": "error" })
            }
            else res.json({ "message": "correct" })
        })
    }

    isReserved = (req: express.Request, res: express.Response) => {
        BookReservationModel.findOne({ bookId: req.body.bookId, status: 'active', mail: req.body.mail }, (err, reservation) => {
            if (err) { console.log(err) }
            else {
                res.json(reservation)
            }
        })
    }

    getAccepttedReservations = (req: express.Request, res: express.Response) => {
        BookReservationModel.find({status: 'accepted', mail: req.body.mail }, (err, reservation) => {
            if (err) { console.log(err) }
            else {
                res.json(reservation)
            }
        })
    }
}