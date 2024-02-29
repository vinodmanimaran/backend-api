import OtherInsurance from "../models/OtherInsurances.js";
import expressAsyncHandler from 'express-async-handler';
import Agent from '../models/Agent.js';

export const OtherInsuranceController = expressAsyncHandler(async (req, res) => {
  try {
    const {
      name,
      mobile,
      alternate_number,
      place,
      district,
    } = req.body;


    const referralID = req.params.referralID; // Extract referralID from request parameters
    console.log(referralID)

    // Find the agent using the referral ID extracted from the URL
    const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
    if (!agent) {
        return res.status(404).json({ message: "Agent not found for the provided referral ID" });
    }


    const newOtherInsurance = new OtherInsurance({
      name,
      mobile,
      alternate_number,
      place,

      district,

      agentId:agent.agentId
    });

    const savedOtherInsurance = await newOtherInsurance.save();

    res.status(201).json(savedOtherInsurance);
  } catch (error) {
    console.error('Error creating other insurance submission:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



export const getOtherInsurance=expressAsyncHandler(async(req,res)=>{
  try {
    const referralID = req.params.referralID; 
    console.log(referralID)
   // Find the agent associated with the referral ID
   const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
  

    const OtherInsurances=await OtherInsurance.find({agentId:agent.agentId})
    res.status(200).json({agent,OtherInsurances})
  } catch (error) {
    console.error( error.response.name);
    res.status(500).json({ message: "Internal Server Error" });
  }
})