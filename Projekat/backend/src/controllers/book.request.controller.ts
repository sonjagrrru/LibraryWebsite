import express, { Request, Response } from 'express';
import BookRequestModel from '../model/book.request'

export class BookRequestController {

    insertRequest = (req:Request, res:Response)=>{
        let request = new BookRequestModel({
            id: req.body.id,
            title: req.body.title,
            caption: req.body.caption,
            genre: req.body.genre,
            img: req.body.img,
            language: req.body.language,
            publishYear: req.body.publishYear,
            publisher: req.body.publisher,
            writers:req.body.writers,
            username: req.body.username,
            numOfBooks: req.body.numOfBooks
        })

        request.save((err, resp) => {
            if (err) {
                console.log(err);
                res.status(400).json({ "message": "error" })
            }
            else res.json({ "message": "correct" })
        })
    }

    getId = (req:Request, res:Response)=>{
        BookRequestModel.find({}, (err, requests) => {
            if (err)
                console.log(err)
            else {
                requests = requests.sort((a,b)=>b.id-a.id)
                console.log(requests[0].id)
                res.json(requests[0].id)
            }
        })
    }

    getAllRequests = (req:Request, res:Response)=>{
        BookRequestModel.find({},(err,requests)=>{
            if(err)
                console.log(err)
            else
                res.json(requests)
        })
    }

    delete = (req: Request, res: Response) => {
        let id = req.body.id;

        BookRequestModel.deleteOne({ 'id': id }, (err, resp) => {
            if (err) { console.log(err) }
            else {
                res.json({ 'message': 'correct' })
                console.log('obrisan')
            }
        })
    }
}