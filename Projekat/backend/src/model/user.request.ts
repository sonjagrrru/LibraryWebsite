import { ObjectId, ObjectID } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema

let UserRequest = new Schema({
    id: {
        type: Number
    },
    username: {
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
    }
})

export default mongoose.model('UserRequestModel', UserRequest, 'korisnikZahtev')