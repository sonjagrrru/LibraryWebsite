import express, { Request, Response } from 'express';
import { IntegerType } from 'mongodb';
import internal from 'stream';
import { json } from 'stream/consumers';
import BookModel from '../model/book'

export class BookController {

    getBooksByParams = (req: Request, res: Response) => {
        console.log(req.body.param)
        BookModel.find({ $or: [{ writers: { $regex: req.body.param } }, { title: { $regex: req.body.param } }] }, (err, books) => {
            if (err)
                console.log(err)
            else {
                res.json(books)
            }
        })
    }

    bookOfDay = (req: Request, res: Response) => {
        BookModel.findOne({ bookOfDay: true }, (err, book) => {
            if (err)
                console.log(err)
            else {
                //console.log(book.rating)
                res.json(book)
            }

        })
    }

    getTopBooks = (req: Request, res: Response) => {
        BookModel.find({}, (err, books) => {
            if (err)
                console.log(err)
            else {
                books = books.sort((a, b) => b.numOfBorrowing - a.numOfBorrowing).slice(0, 3)
                res.json(books)
            }
        })
    }

    getBookById = (req: Request, res: Response) => {
        BookModel.findOne({ id: req.body.id }, (err, book) => {
            if (err) console.log(err)
            else res.json(book)
        })
    }

    getId = (req: Request, res: Response) => {
        BookModel.find({}, (err, books) => {
            if (err)
                console.log(err)
            else {
                books = books.sort((a, b) => b.id - a.id)
                console.log(books[0].id)
                res.json(books[0].id)
            }
        })
    }

    getUsersBooks = (req: Request, res: Response) => {
        BookModel.find({username:req.body.username}, (err, books) => {
            if (err)
                console.log(err)
            else {
                res.json(books)
            }
        })
    }

    deleteBook = (req: Request, res: Response) => {
        let id = req.body.id

        BookModel.deleteOne({ 'id': id }, (err, resp) => {
            if (err) { console.log(err) }
            else { res.json({ 'message': 'correct' }) }
        })
    }

    insert = (req: express.Request, res: express.Response) => {
        let book = new BookModel({
            id: req.body.id,
            title: req.body.title,
            genre: req.body.genre,
            language: req.body.language,
            publishYear: req.body.publish,
            publisher: req.body.publisher,
            img: req.body.img,
            numOfFreeBooks: req.body.numOfAllBooks,
            numOfBorrowing: 0,
            numOfRatings: 0,
            bookOfDay: false,
            caption: req.body.caption,
            writers: req.body.writers,
            rating: 0,
            numOfAllBooks: req.body.numOfAllBooks,
            username: req.body.username
        })

        //console.log('a'+req.body.numOfAllBooks)
        //console.log('b'+req.body.publish)

        book.save((err, resp) => {
            if (err) {
                console.log(err);
                res.status(400).json({ "message": "error" })
            }
            else res.json({ "message": "correct" })
        })
    }

    update = (req: express.Request, res: express.Response) => {
        BookModel.updateOne({ id: req.body.id }, {
            $set: {
                title: req.body.title,
                genre: req.body.genre,
                language: req.body.language,
                publishYear: req.body.publish,
                publisher: req.body.publisher,
                img: req.body.img,
                numOfFreeBooks: req.body.numOfFreeBooks,
                caption: req.body.caption,
                writers: req.body.writers,
                numOfAllBooks: req.body.numOfAllBooks,
                bookOfDay: req.body.bookOfDay
            }
        }, (err, resp) => {
            if (err) { console.log(err) }
            else {
                res.json({ 'message': 'correct' })
            }
        })
    }

    updateFreeBooks = (req: express.Request, res: express.Response) => {
        BookModel.updateOne({ id: req.body.id }, {
            $set: {
                numOfFreeBooks: req.body.numOfFreeBooks
            }
        }, (err, resp) => {
            if (err) { console.log(err) }
            else {
                res.json({ 'message': 'correct' })
            }
        })
    }

    getAllBooks = (req: Request, res: Response) => {
        BookModel.find({}, (err, books) => {
            if (err)
                console.log(err)
            else {
                res.json(books)
            }
        })
    }
}