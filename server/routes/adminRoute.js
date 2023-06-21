const express = require('express');
const adminRoute = express();

const adminAuth = require('../middleWare/adminJwt')




const adminController = require('../controller/adminController')



adminRoute.post('/admin-login', adminController.adminLogin)

adminRoute.get('/admin-home', adminAuth, adminController.adminHome)

adminRoute.post('/admin-user',adminAuth,adminController.adminUserupdate)

adminRoute.post('/admin-home',adminAuth,adminController.userBlock)

adminRoute.post('/admin-createuser', adminAuth,adminController.userCreate)


module.exports = adminRoute;