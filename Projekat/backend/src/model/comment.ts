import mongoose from "mongoose";

const Schema = mongoose.Schema

let Comment = new Schema({
    idBook: {
        type: Number
    },
    mail: {
        type: String
    },
    grade: {
        type: Number
    },
    comment: {
        type: String
    },
    username: {
        type: String
    },
    status: {
        type: String
    },
    date: {
        type: String
    }
})

export default mongoose.model('CommentModel', Comment, 'ocene')