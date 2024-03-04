import CreditCard from "../models/CreditCard.js";
import Agent from '../models/Agent.js';
import expressAsyncHandler from 'express-async-handler';

export const CreditCardController = expressAsyncHandler(async (req, res) => {
    try {
        console.log("Received Data:", req.body);
        console.log("Request Params:", req.params);


        const {
            name,
            mobile,
            alternate_number,
            Place,
            District
        } = req.body;

        const referralID = req.params.referralID; // Extract referralID from request parameters
        console.log(referralID)

        // Find the agent using the referral ID extracted from the URL
        const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
        if (!agent) {
            return res.status(404).json({ message: "Agent not found for the provided referral ID" });
        }

        // Create a new CreditCard instance
        const newCreditCard = new CreditCard({
            name,
            mobile,
            alternate_number,
            Place,
            District,
            agentId: agent.agentId 
        });

        // Save the new CreditCard
        const savedCreditCard = await newCreditCard.save();

        console.log("Received Credit Card Data:", savedCreditCard);

        // Send response with the agent's details
        res.status(201).json({ savedCreditCard, agent });
    } catch (error) {
        console.error('Error creating credit card submission:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export const GetCreditCardController = expressAsyncHandler(async (req, res) => {
    try {
        const referralID = req.params.referralID; 
         console.log(referralID)
        // Find the agent associated with the referral ID
        const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
       

        // Find credit cards associated with the agent
        const creditCards = await CreditCard.find({ agentId: agent.agentId });

        res.status(200).json({ agent, creditCards });
    } catch (error) {
        console.error('Error getting CreditCard Details:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
