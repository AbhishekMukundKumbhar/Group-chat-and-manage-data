const express = require('express');
const { sendMessage, getAllMessages } = require('../controller/Messages');
const requireLogin = require('../middleware/requireLogin');
const messages_router = express.Router();

messages_router.post('/send/:groupid',requireLogin,sendMessage);
messages_router.get('/all/:groupid',requireLogin,getAllMessages);


module.exports = messages_router;