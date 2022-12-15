import express, { Request, Response } from 'express';
import { IntegerType } from 'mongodb';
import internal from 'stream';
import UserModel from '../model/user'

export class UserController {


    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({ 'username': username, 'password': password }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    register = (req: express.Request, res: express.Response) => {
        let user = new UserModel({
            userType: "user",
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            lastname: req.body.lastname,
            address: req.body.address,
            phone: req.body.phone,
            mail: req.body.mail,
            img: req.body.img,
            status: "active"
        })

        user.save((err, resp) => {
            if (err) {
                console.log(err);
                res.status(400).json({ "message": "error" })
            }
            else res.json({ "message": "correct" })
        })
    }

    getAllUsers = (req: Request, res: Response) => {
        UserModel.find({}, (err, users) => {
            if (err)
                console.log(err)
            else
                res.json(users)
        })
    }

    getUser = (req: Request, res: Response) => {
        UserModel.findOne({ mail: req.body.mail }, (err, user) => {
            if (err)
                console.log(err)
            else
                res.json(user)
        })
    }

    deleteUser = (req: Request, res: Response) => {
        let mail = req.body.mail

        UserModel.deleteOne({ 'mail': mail }, (err, resp) => {
            if (err) { console.log(err) }
            else { res.json({ 'message': 'correct' }) }
        })
    }

    updateUser = (req: Request, res: Response) => {

        let mail = req.body.mail;
        UserModel.updateOne({ mail: mail }, {
            $set: {
                userType: req.body.userType,
                status: req.body.status
            }
        }, (err, resp) => {
            if (err) { console.log(err) }
            else {
                res.json({ 'message': 'correct' })
            }
        })
    }

    changePassword = (req: Request, res: Response) => {

        let mail = req.body.mail;
        UserModel.updateOne({ mail: mail }, {
            $set: {
                password: req.body.password
            }
        }, (err, resp) => {
            if (err) { console.log(err) }
            else {
                res.json({ 'message': 'correct' })
            }
        })
    }

    updateUser2 = (req: Request, res: Response) => {

        let mail = req.body.mail;
        UserModel.updateOne({ mail: mail }, {
            $set: {
                name: req.body.name,
                lastname: req.body.lastname,
                address: req.body.address,
                phone: req.body.phone,
                username: req.body.username
            }
        }, (err, resp) => {
            if (err) { console.log(err) }
            else {
                res.json({ 'message': 'correct' })
            }
        })
    }

}