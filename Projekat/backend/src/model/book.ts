import mongoose from "mongoose";

const Schema = mongoose.Schema

let Book = new Schema({
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
    numOfFreeBooks: {
        type: Number
    },
    writers: {
        type: String
    },
    caption: {
        type: String
    },
    bookOfDay: { 
        type: Boolean
     },
    rating: { 
        type: Number
     },
    numOfRatings: { 
        type: Number 
    },
    numOfBorrowing:{
        type: Number
    },
    numOfAllBooks:{
        type: Number
    },
    username: {
        type: String
    }
})

export default mongoose.model('BookModel', Book, 'knjiga')