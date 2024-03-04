import JobQuery from "../models/JobQuery.js";
import expressAsyncHandler from 'express-async-handler';
import Agent from '../models/Agent.js';

export const JobQueryController = expressAsyncHandler(async (req, res) => {
  try {
    const {
      name,
      mobile,
      alternate_number,
      Qualification,
      Experience,
      Country,
      place,
      district,
    } = req.body;
    const referralID = req.params.referralID;

    const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
    if (!agent) {
        return res.status(404).json({ message: "Agent not found for the provided referral ID" });
    }

    const newJobQuery = new JobQuery({
      name,
      mobile,
      alternate_number,
      Qualification,
      Experience,
      Country,
      place,
      district,
      agentId:agent.agentId
    });


    const savedJobQuery = await newJobQuery.save();

    res.status(201).json(savedJobQuery);
  } catch (error) {
    console.error('Error creating job query:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export const GetJobQueryController = expressAsyncHandler(async (req, res) => {
  try {

    const referralID = req.params.referralID; 
  const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
  const JobQuerys = await JobQuery.find({agentId:agent.agentId});

    res.status(200).json({ agent, JobQuerys });
  } catch (error) {
    console.error('Error getting JobQuery Details:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
