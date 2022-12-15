import { ObjectId, ObjectID } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema

let User = new Schema({
    userType:{
        type: String
    },
    username:{
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    mail: {
        type: String
    },
    img: {
        type: String
    },
    status: {
        type: String
    }
})

export default mongoose.model('UserModel', User, 'korisnik')