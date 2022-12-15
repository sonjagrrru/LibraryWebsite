import express, { Request, Response } from 'express';
import CommentModel from '../model/comment'

export class CommentController {

    getCommentsForBook = (req: express.Request, res: express.Response) => {
        CommentModel.find({ idBook: req.body.id }, (err, comments) => {
            if (err) { console.log(err) }
            else {
                res.json(comments)
            }
        })
    }

    setComment = (req: express.Request, res: express.Response) => {
        CommentModel.find({ idBook: req.body.idBook, mail: req.body.mail }, (err, comments) => {
            if (err) { console.log(err) }
            else {
                if (comments.length==0) {
                    //insert
                    let comment = new CommentModel({
                        comment: req.body.comment,
                        date: req.body.date,
                        grade: req.body.grade,
                        idBook: req.body.idBook,
                        mail: req.body.mail,
                        status: 'novi',
                        username: req.body.username
                    })

                    comment.save((err, resp) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ "message": "error" })
                        }
                        else res.json({ "message": "correct" })
                    });
                }
                else {
                    //update
                    CommentModel.updateOne({ idBook: req.body.idBook, mail: req.body.mail }, {
                        $set: {
                            comment: req.body.comment,
                            date: req.body.date,
                            grade: req.body.grade,
                            status: 'azuriran'
                        }
                    }, (err, resp) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({ "message": "error" })
                        }
                        else res.json({ "message": "correct" })
                    })
                }
            }
        })
    }
}