import express, { Request, Response } from 'express';
import BorrowingModel from '../model/borrowing'
import BookModel from '../model/book'

export class BorrowingController {

    getBorrowedBooks = (req: express.Request, res: express.Response) => {
        let usermail = req.body.usermail;

        BorrowingModel.find({userMail: usermail, status: 'active'}, (err, borrowings) => {
            if (err) { console.log(err) }
            else {
                res.json(borrowings)
            }
        })
    }

    getAllUserBorrowedBooks = (req: express.Request, res: express.Response) => {
        let usermail = req.body.usermail;

        BorrowingModel.find({userMail: usermail}, (err, borrowings) => {
            if (err) { console.log(err) }
            else {
                res.json(borrowings)
            }
        })
    }

    isBorrowedBoook = (req: express.Request, res: express.Response) => {
        let idBook = req.body.idBook;

        BorrowingModel.find({bookId: idBook, status: 'active'}, (err, borrowings) => {
            if (err) { console.log(err) }
            else {
                res.json(borrowings)
            }
        })
    }

    getAllBorrowingRequests = (req: express.Request, res: express.Response) => {
        let usermail = req.body.usermail;

        BorrowingModel.find({userMail: usermail}, (err, borrowings) => {
            if (err) { console.log(err) }
            else {
                res.json(borrowings)
            }
        })
    }

    getBorrowingByBookAndUser= (req: express.Request, res: express.Response) => {
        let usermail = req.body.usermail;
        let bookId = req.body.bookId;

        BorrowingModel.findOne({userMail: usermail, bookId: bookId}, (err, borrowings) => {
            if (err) { console.log(err) }
            else {
                res.json(borrowings)
            }
        })
    }

    insertBorrowing = (req: express.Request, res: express.Response) => {
        let borrowing = new BorrowingModel({
            bookId: req.body.bookId,
            bookName: req.body.bookName,
            dateOfBorrowing: req.body.dateOfBorrowing,
            status: 'active',
            dateOfReturn: 'Thu Jan 01 1970 00:00:00 GMT+0100 (Central European Standard Time)',
            userMail: req.body.userMail,
            writers: req.body.writers
        })

        borrowing.save((err, resp) => {
            if (err) {
                console.log(err);
                res.status(400).json({ "message": "error" })
            }
            else res.json({ "message": "correct" })
        })
    }

    setReturning = (req: express.Request, res: express.Response) => {

        BorrowingModel.updateOne({
            bookId: req.body.bookId,
            userMail: req.body.mail
        }, {
            $set: {
                dateOfReturn: req.body.returnTime,
                status: 'finished'
            }
        }, (err, resp) => {
            if (err) { console.log(err) }
            else { res.json({ 'message': 'correct' }) }
        })
    }

    setExtend = (req: express.Request, res: express.Response) => {

        BorrowingModel.updateOne({
            bookId: req.body.bookId,
            userMail: req.body.mail,
            status: 'active'
        }, {
            $set: {
                produzena:true
            }
        }, (err, resp) => {
            if (err) { console.log(err) }
            else { res.json({ 'message': 'correct' }) }
        })
    }

}