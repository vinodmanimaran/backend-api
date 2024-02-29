import Insurance from "../models/Insurance.js";
import expressAsyncHandler from 'express-async-handler';
import Agent from '../models/Agent.js';

export const InsuranceController = expressAsyncHandler(async (req, res) => {
  try {
    const {
      name,
      mobile,
      alternate_number,
      place,
      insurance_type,
            district,
    } = req.body;


    const referralID = req.params.referralID; // Extract referralID from request parameters
    console.log(referralID)

    // Find the agent using the referral ID extracted from the URL
    const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
    if (!agent) {
        return res.status(404).json({ message: "Agent not found for the provided referral ID" });
    }


    const newInsurance = new Insurance({
      name,
      mobile,
      alternate_number,
      place,
      district,
      insurance_type,
      agentId:agent.agentId
    });

    const savedInsurance = await newInsurance.save();

    res.status(201).json(savedInsurance);
  } catch (error) {
    console.error('Error creating  insurance submission:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export const getInsurance=expressAsyncHandler(async(req,res)=>{
  try{

    const referralID = req.params.referralID; 
    console.log(referralID)
   // Find the agent associated with the referral ID
   const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
  
    const Insurances=await Insurance.find({agentId:agent.agentId})
    res.status(200).json({agent,Insurances})
  }catch(error){
    console.error(error.response.name)
    res.status(500).json({message:"Internal Server Error"})
  }
 
})