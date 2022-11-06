const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const auth_router = require('./router/auth');
const admin_user_router = require('./router/adminUser');
const groups_router = require('./router/groups');
const messages_router = require('./router/messages');
app.use(express.json());
app.use(bodyParser.json());

app.use('/auth',auth_router);
app.use('/admin',admin_user_router);
app.use('/group',groups_router);
app.use('/message',messages_router);

app.listen(PORT,()=>{
    console.log('server is listening on port '+ PORT);
})