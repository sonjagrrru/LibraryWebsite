import express, { Request, Response } from 'express';
import UserRequestModel from '../model/user.request'
import UserModel from '../model/user'

export class UserRequestController {
    insert = (req: express.Request, res: express.Response) => {
        let request = new UserRequestModel({
            id: req.body.id,
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            lastname: req.body.lastname,
            address: req.body.address,
            phone: req.body.phone,
            mail: req.body.mail,
            img: req.body.img
        })

        UserModel.findOne({ mail: req.body.mail }, (err, user) => {
            if (err)
                console.log(err)
            else if (user == undefined) {
                request.save((err, resp) => {
                    if (err) {
                        console.log(err);
                        res.json({ "message": "error" })
                    }
                    else res.json({ "message": "correct" })
                })
            }
            else
                res.json({ "message": "mail" })
        })
    }

    getAllUsers = (req: Request, res: Response) => {
        UserRequestModel.find({}, (err, users) => {
            if (err)
                console.log(err)
            else
                res.json(users)
        })
    }

    delete = (req: Request, res: Response) => {
        let id = req.body.id;

        UserRequestModel.deleteOne({ 'id': id }, (err, resp) => {
            if (err) { console.log(err) }
            else {
                res.json({ 'message': 'correct' })
                console.log('obrisan')
            }
        })
    }
}