const feedbackModel = require('../models/feedbackModel');

async function getFeedbackById(req, res){
    const {id} = req.params;
    try{
        const feedback = await feedbackModel.getFeedbackById(id);
        res.status(200).json(feedback);
    }

    catch (error){
        console.log(error);
        res.status(500).send(error);
    }
};

async function createFeedback (req,res) {
    try {
        const {id} = req.params;
        const {feedback} = req.body;
        const newFeedback = await feedbackModel.createFeedback(feedback, userId);
        res.status(201).json(newFeedback);
    } catch (error){
        console.log(error);
    }

};


module.exports = {getFeedbackById, createFeedback};