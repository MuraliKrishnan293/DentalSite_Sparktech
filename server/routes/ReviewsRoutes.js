const express = require("express");
const router = express.Router();
const Reviews  = require("../models/Reviews");
const middleware = require("../verify");
const {isAdmin} = require("../checkuser");

router.post("/postreview", async(req, res)=>{
    const { username, comment, rating } = req.body;
    try{
        const newReview = new Reviews({ username, comment, rating });
        await newReview.save();
        res.status(200).json({ message: "Review added successfully!" });
    } catch(err){
        res.json({ message: err });
    }
});

router.get('/getreviews', middleware, isAdmin, async(req, res)=>{
    try{
        const allReviews = await Reviews.find({});
        res.json(allReviews);
    } catch(err){
        res.json({ message: err });
    }
});

module.exports = router;