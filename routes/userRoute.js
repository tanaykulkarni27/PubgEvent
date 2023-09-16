const express = require('express');
const { pool } = require('../database/connection');
const { generateVerificationToken, verifyToken } = require('../database/jwttoken');
const UserRouter = express.Router();

function genPassword(){
    var pass = '';
    for(var i = 0;i < 7;i++){
        const x = parseInt((Math.random() * 100) % 26);
        pass += String.fromCharCode(97+x);
    }
    return pass;
}

const addUser = async (req,res)=>{
    await pool.query(`INSERT INTO User (Username, Password, Phonenumber,event)VALUES (?,?,?,?)`,
    [
        req.body.Phonenumber,
        genPassword(),
        parseInt(req.body.Phonenumber),
        req.body.eventId
    ]);
    res.json({status:true});
}

const getUsers = async (req,res)=>{
    const {token} = req.query;
    try{
        const Phonenumber = verifyToken(token);
        const [rows] = await pool.query(`SELECT * FROM User`);
        res.json(rows);
    }catch(err){
        res.status(400).json({status:false});
    }   
}

const adminLogin = async (req,res)=>{
    const {Phonenumber,password} = req.body;
    const [row] = await pool.query(`SELECT * FROM User WHERE Phonenumber = ? AND password = ?`,[Phonenumber,password]);
    if(row[0].role === 'admin'){
        const token = generateVerificationToken(Phonenumber);
        res.json({status : true,token:token});
    }else{
        res.status(400).json({status:false,message:'incorrect credentials'});
    }
}

UserRouter.post('',addUser);
UserRouter.post('/admin',adminLogin);
UserRouter.get('',getUsers);

module.exports = UserRouter;