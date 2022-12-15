import mongoose from "mongoose";

const Schema = mongoose.Schema

let Borrowing = new Schema({
    userMail: {
        type: String
    },
    bookName: {
        type: String
    },
    bookId: {
        type: Number
    },
    dateOfBorrowing: {
        type: String
    },
    dateOfReturn: {
        type: String
    },
    status: {
        type: String
    },
    writers: {
        type: String
    },
    produzena: {
        type: Boolean
    }
})

export default mongoose.model('BorrowingModel', Borrowing, 'zaduzenja')