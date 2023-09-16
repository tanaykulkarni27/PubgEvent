// Npm imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

// Local imports
const { create_tables } = require('./database/table');
const EventRouter = require('./routes/EventRoute');
const UserRouter = require('./routes/userRoute');


const app = express();

// MiddleWares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    })
);
app.use(fileUpload());




app.use(express.static(__dirname + '/public'));

// home page
app.get('',(req,res)=>{
    res.sendFile(__dirname + '/htmls/index.html')
})

// Admin Page
app.get('/admin/panel',(req,res)=>{
    res.sendFile(__dirname + '/htmls/admin_panel.html')
})

// Admin Login page
app.get('/admin/login',(req,res)=>{
    res.sendFile(__dirname + '/htmls/admin_login.html')
})

// Add Event
app.get('/admin/addevent',(req,res)=>{
    res.sendFile(__dirname + '/htmls/add_event.html')
})

//Create tables query
create_tables();

// Event Api
app.use('/eventhandler/api',EventRouter)

// User Api
app.use('/userhandler/api',UserRouter);




app.listen(3000,()=>{
    console.log('listening to port:3000')
});