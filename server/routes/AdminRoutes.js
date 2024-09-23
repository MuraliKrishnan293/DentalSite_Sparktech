const express = require("express");
const router = express.Router();
const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModel");
const middleware = require("../verify");
const {isAdmin} = require("../checkuser");

router.get("/allusers", middleware, isAdmin, async(req, res)=>{
    try{
        const users = await userModel.find({});
        res.json(users);
    }
    catch(e){
        res.json(e);
    }
});

router.get("/allappointments", middleware, isAdmin, async(req, res)=>{
    try{
        const appointments = await appointmentModel.find({});
        return res.json(appointments);
    }
    catch(e){
        return res.status(400).json(e);
    }
});

module.exports = router;