import RealEstate from "../models/RealEstate.js";
import expressAsyncHandler from 'express-async-handler';
import Agent from '../models/Agent.js';

export const RealEstateController = expressAsyncHandler(async (req, res) => {
  try {
    const {
      name,
      mobile,
      alternate_number,
      purchaseOrSale,
      agreeOrCommercial,
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


    const newRealEstate = new RealEstate({
      name,
      mobile,
      alternate_number,
      purchaseOrSale,
      agreeOrCommercial,
      place,
      district,
      agentId:agent.agentId
    });

    const savedRealEstate = await newRealEstate.save();

    res.status(201).json(savedRealEstate);
  } catch (error) {
    console.error('Error creating real estate submission:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export const getRealEstate=expressAsyncHandler(async(req,res)=>{
  try {
    const referralID = req.params.referralID; 
    console.log(referralID)
   // Find the agent associated with the referral ID
   const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
  
    const RealEstates=await RealEstate.find({agentId:agent.agentId})
    res.status(200).json({agent,RealEstates})
  } catch (error) {
    console.error(error.response.name)
    res.status(500).json({message:"Internal Server Error"})
  }
})