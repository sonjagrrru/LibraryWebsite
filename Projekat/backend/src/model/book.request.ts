import mongoose from "mongoose";

const Schema = mongoose.Schema

let BookRequest = new Schema({
    id: {
        type: Number
    },
    title: {
        type: String
    },
    genre: {
        type: String
    },
    language: {
        type: String
    },
    publishYear: {
        type: Number
    },
    publisher: {
        type: String
    },
    img: {
        type: String
    },
    writers: {
        type: String
    },
    caption: {
        type: String
    },
    username: {
        type: String
    },
    numOfBooks: {
        type: Number
    }
})

export default mongoose.model('BookRequestModel', BookRequest, 'knjigaZahtev')