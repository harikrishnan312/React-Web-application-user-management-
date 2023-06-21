const express = require('express');
const userRoute = express();


const userAuth = require('../middleWare/jwt')

const upload = require('../middleWare/multer')

const userController = require('../controller/userController');


userRoute.post('/signup',userController.userSignUp )

userRoute.post('/login',userController.verifyLogin )

userRoute.get('/', userAuth,userController.userHome)

userRoute.get('/profile',userAuth,userController.userProfile )

userRoute.post('/profile',upload.single('image'),userAuth,userController.addProfile)

userRoute.post('/edit',userAuth,userController.userEdit )

module.exports = userRoute;