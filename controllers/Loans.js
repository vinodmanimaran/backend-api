import Loan from "../models/Loans.js";
import expressAsyncHandler from 'express-async-handler';
import Agent from '../models/Agent.js';

export const LoanController = expressAsyncHandler(async (req, res) => {
  try {
    const {
      name,
      mobile,
      alternate_number,
      amount,
      Place,
      loan_type,
      District,
    } = req.body;

    const referralID = req.params.referralID; // Extract referralID from request parameters

    // Find the agent using the referral ID extracted from the URL
    const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
    if (!agent) {
        return res.status(404).json({ message: "Agent not found for the provided referral ID" });
    }


    const newLoan = new Loan({
      name,
      mobile,
      alternate_number,
      amount,
      Place,
      District,
      loan_type,
      agentId:agent.agentId
    });

    const savedLoan = await newLoan.save();

    res.status(201).json(savedLoan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export const GetLoan=expressAsyncHandler(async(req,res)=>{
  try {
    const referralID = req.params.referralID; 
   // Find the agent associated with the referral ID
   const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
  

    const Loans=await Loan.find({agentId:agent.agentId})
    res.status(200).json({agent,Loans})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})