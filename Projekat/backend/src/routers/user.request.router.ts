import express from 'express'
import { UserRequestController } from '../controllers/user.request.controller'

const userRouter = express.Router()

userRouter.route('/insert').post(
    (req,res)=>new UserRequestController().insert(req,res)
)

userRouter.route('/getAllRequests').get(
    (req,res)=>new UserRequestController().getAllUsers(req,res)
)

userRouter.route('/delete').post(
    (req,res)=>new UserRequestController().delete(req,res)
)

export default userRouter;