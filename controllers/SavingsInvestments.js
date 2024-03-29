import SavingsInvestments from "../models/SavingsInvestments.js";
import expressAsyncHandler from 'express-async-handler';
import Agent from '../models/Agent.js';

export const SavingsInvestmentsController = expressAsyncHandler(async (req, res) => {
  try {
    const {
      name,
      mobile,
      alternate_number,
      Place,
      savingamount,
      District,
    } = req.body;

    const referralID = req.params.referralID; 

    const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
    if (!agent) {
        return res.status(404).json({ message: "Agent not found for the provided referral ID" });
    }


    const newSavingsInvestments = new SavingsInvestments({
      name,
      mobile,
      alternate_number,
      Place,
      District,
      savingamount,
      agentId:agent.agentId
    });

    const savedSavingsInvestments = await newSavingsInvestments.save();

    res.status(201).json(savedSavingsInvestments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



export const getSavingsInvestment=expressAsyncHandler(async(req,res)=>{

  try {

    const referralID = req.params.referralID; 
   // Find the agent associated with the referral ID
   const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
  
    const SavingsInvestments=await SavingsInvestments.find({agent:agent.agentId})
    res.status(200).json({agent,SavingsInvestments})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 
})