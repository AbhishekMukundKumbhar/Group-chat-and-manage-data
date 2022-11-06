const express = require('express');
const {createNewUser, editUser,getAllUsers} = require('../controller/AdminUser');
const requireLogin = require('../middleware/requireLogin');
const shouldAdmin = require('../middleware/shouldAdmin');
const admin_user_router = express.Router();


admin_user_router.post('/createUser',[requireLogin,shouldAdmin], createNewUser);
admin_user_router.put('/editUser', [requireLogin, shouldAdmin], editUser);
admin_user_router.get('/getAllUsers', [requireLogin, shouldAdmin], getAllUsers);

module.exports = admin_user_router;