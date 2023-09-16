const express = require('express');
const { pool } = require('../database/connection');
const { verifyToken } = require('../database/jwttoken');
const EventRouter = express.Router();

const getEvents = async (req,res)=>{
    const [rows] = await pool.query('SELECT * FROM Event');
    res.json(rows);
}


const addEvents = async (req,res)=>{
    var dataUrl = '';
    var file = req.files;
    var DataRecieved = req.body;
    
    if (file) {
        file = file.EventImage;
        dataUrl = `${file.data.toString('base64')}`;
        DataRecieved.EventImage = dataUrl;
    }
    try{
        const Phonenumber = verifyToken(DataRecieved.token);
        delete DataRecieved.token;

        const [TotalRows] = await pool.query('SELECT * FROM Event');
        if(TotalRows.length >= 4){
            await pool.query(`DELETE FROM Event WHERE Id = ?`,[TotalRows[0].Id]);
        }

        const [result] = await pool.query(
            `INSERT INTO Event (
                EventImage,
                Schedule,
                Title,
                Descript
              ) VALUES (?, ?, ?, ?)`,
            [
                DataRecieved.EventImage,
                DataRecieved.Schedule,
                DataRecieved.Title,
                DataRecieved.Descript
            ]);
    
        res.json({status:'done'})
    }catch(err){
        console.log(error);
    }   
    
}

// getting the data
EventRouter.get('',getEvents);

// getting the data
EventRouter.post('',addEvents);


module.exports = EventRouter;