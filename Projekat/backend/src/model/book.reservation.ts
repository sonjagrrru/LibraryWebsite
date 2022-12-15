import mongoose from "mongoose";

const Schema = mongoose.Schema

let BookReservation = new Schema({
    bookId: {
        type: Number
    },
    title: {
        type: String
    },
    mail: {
        type: String
    },
    status: {
        type: String
    },
    date: {
        type: String
    }
})

export default mongoose.model('BookReservationModel', BookReservation, 'rezervacijaKnjige')