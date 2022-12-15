import { ObjectId, ObjectID } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema

let Library = new Schema({
    id: {
        type: Number
    },
    borrowTime: {
        type: Number
    },
    extendTime: {
        type: Number
    }
})

export default mongoose.model('LibraryModel', Library, 'biblioteka')