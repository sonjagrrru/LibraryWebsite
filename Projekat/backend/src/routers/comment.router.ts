import express from 'express'
import { CommentController } from '../controllers/comment.controller';

const commentRouter = express.Router()

commentRouter.route('/getCommentsForBook').post(
    (req, res) => new CommentController().getCommentsForBook(req, res)
)

commentRouter.route('/setComment').post(
    (req, res) => new CommentController().setComment(req, res)
)

export default commentRouter;