import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/user.router';
import multer from 'multer';
import userRequestRouter from './routers/user.request.router';
import libraryRouter from './routers/library.router';
import bookRouter from './routers/book.router';
import bookRequestRouter from './routers/book.request.router';
import borrowingRouter from './routers/borrowing.router';
import commentRouter from './routers/comment.router';
import bookReservationRouter from './routers/book.reservation.router';

const app = express();
app.use(cors());
app.use(express.json());

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './../frontend/library/src/assets/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({storage: fileStorageEngine});

app.post("/file", upload.single('file'), (req, res)=>{
    console.log(req.body.file.filename);
    res.send(req.body.file);
});

mongoose.connect('mongodb://localhost:27017/projekat')
const connection = mongoose.connection
connection.once('open',()=>{
    console.log('connection succed')
})

const router = express.Router();
router.use('/users', userRouter)
router.use('/requests', userRequestRouter)
router.use('/general', libraryRouter)
router.use('/books', bookRouter)
router.use('/bookRequests', bookRequestRouter)
router.use('/borrowings', borrowingRouter)
router.use('/comment', commentRouter)
router.use('/bookReservation',bookReservationRouter)

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));