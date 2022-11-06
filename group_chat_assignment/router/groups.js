const express = require('express');
const {createGroup,deleteGroup, searchGroup,getAllGroups, addUserToGroup,getAllGroupMembers} = require('../controller/Groups');
const requireLogin = require('../middleware/requireLogin');
const groups_router = express.Router();


groups_router.post('/createGroup',requireLogin,createGroup);
groups_router.delete('/deleteGroup/:groupid', requireLogin,deleteGroup);
groups_router.get('/getAllGroups', requireLogin,getAllGroups);
groups_router.get('/searchGroup/:searchQuery', requireLogin,searchGroup);
groups_router.post('/addUser/:groupid',requireLogin,addUserToGroup);
groups_router.get('/getAllMembers/:groupid',requireLogin,getAllGroupMembers);

module.exports = groups_router;