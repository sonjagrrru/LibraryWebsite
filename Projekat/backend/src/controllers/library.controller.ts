import express, { Request, Response } from 'express';
import { IntegerType } from 'mongodb';
import internal from 'stream';
import LibraryModel from '../model/library'

export class LibraryController {

    setBorrow = (req: express.Request, res: express.Response) => {
        let borrowTime = req.body.borrow;

        LibraryModel.updateOne({
            id: 1
        }, {
            $set: {
                borrowTime: borrowTime
            }
        }, (err, resp) => {
            if (err) { console.log(err) }
            else { res.json({ 'message': 'correct' }) }
        })
    }

    setExtend = (req: express.Request, res: express.Response) => {
        let extendTime = req.body.extend;

        LibraryModel.updateOne({
            id: 1
        }, {
            $set: {
                extendTime: extendTime
            }
        }, (err, resp) => {
            if (err) { console.log(err) }
            else { res.json({ 'message': 'correct' }) }
        })
    }

    getData = (req: express.Request, res: express.Response) => {
        LibraryModel.findOne({ id: 1 }, (err, general) => {
            if (err) { console.log(err) }
            else {
                res.json(general)
            }
        })
    }
}