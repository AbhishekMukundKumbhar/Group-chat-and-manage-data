const express = require('express');
const {signIn, signUp} = require('../controller/Auth');
const auth_router = express.Router();


auth_router.post('/signup', signUp);
auth_router.post('/signin', signIn);

module.exports = auth_router;