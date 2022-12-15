import express from 'express'
import { UserController } from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.route('/login').post(
    (req,res)=>new UserController().login(req,res)
)

userRouter.route('/register').post(
    (req,res)=>new UserController().register(req,res)
)

userRouter.route('/getAllUsers').get(
    (req,res)=>new UserController().getAllUsers(req,res)
)

userRouter.route('/getUser').post(
    (req,res)=>new UserController().getUser(req,res)
)

userRouter.route('/deleteUser').post(
    (req,res)=>new UserController().deleteUser(req,res)
)

userRouter.route('/updateUser').post(
    (req,res)=>new UserController().updateUser(req,res)
)

userRouter.route('/updateUser2').post(
    (req,res)=>new UserController().updateUser2(req,res)
)

userRouter.route('/changePassword').post(
    (req,res)=>new UserController().changePassword(req,res)
)

export default userRouter;