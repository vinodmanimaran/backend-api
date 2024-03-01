import JobQuery from "../models/JobQuery.js";
import expressAsyncHandler from 'express-async-handler';
import { handleFormSubmission } from "../utils/EmailHandler.js";
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
      Place,
      District,
    } = req.body;
    const referralID = req.params.referralID; // Extract referralID from request parameters
    console.log(referralID)

    // Find the agent using the referral ID extracted from the URL
    const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
    if (!agent) {
        return res.status(404).json({ message: "Agent not found for the provided referral ID" });
    }

    const newJobQuery = new JobQuery({
      name:name,
      mobile,
      alternate_number,
      Qualification,
      Experience,
      Country,
      Place,
      District,
      agentId:agent.agentId
    });


    console.log("newJob",newJobQuery)
    const savedJobQuery = await newJobQuery.save();

    const subject = `New Job Query - ${name}`;
    const html=`
    <div style="font-family: 'Arial', sans-serif; color: #333; margin: 0; padding: 0; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; border-radius: 15px; overflow: hidden; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);">
  <div style="background-color: #007bff; color: #fff; padding: 30px; text-align: center; border-bottom: 2px solid #0056b3; border-radius: 15px 15px 0 0;">
    <h1 style="margin: 0; font-size: 24px;">New Job Query</h1>
  </div>
  <div style="padding: 30px;">
    <p>Hello Admin,</p>
    <p style="margin-bottom: 20px;">A new job query has been submitted. Here are the details:</p>
    <div style="margin-top: 20px;">
      <p style="margin-bottom: 10px;"><strong style="color: #007bff; font-weight: bold;">Name:</strong> ${name}</p>
      <p style="margin-bottom: 10px;"><strong style="color: #007bff; font-weight: bold;">Mobile Number:</strong> ${mobile}</p>
      <p style="margin-bottom: 10px;"><strong style="color: #007bff; font-weight: bold;">Alternate Number:</strong> ${alternate_number}</p>
      <p style="margin-bottom: 10px;"><strong style="color: #007bff; font-weight: bold;">Qualification:</strong> ${Qualification}</p>
      <p style="margin-bottom: 10px;"><strong style="color: #007bff; font-weight: bold;">Experience:</strong> ${Experience}</p>
      <p style="margin-bottom: 10px;"><strong style="color: #007bff; font-weight: bold;">Country:</strong> ${Country}</p>
      <p style="margin-bottom: 10px;"><strong style="color: #007bff; font-weight: bold;">Place:</strong> ${Place}</p>
      <p style="margin-bottom: 10px;"><strong style="color: #007bff; font-weight: bold;">District:</strong> ${District}</p>
    </div>
    <p style="margin-top: 20px;">Please review and follow up with the lead.</p>
  </div>
  <div style="background-color: #007bff; color: #fff; padding: 20px; text-align: center; border-top: 2px solid #0056b3; border-radius: 0 0 15px 15px;">
    <p style="font-size: 18px; margin: 0;">Thank you.</p>
  </div>
</div>`

    handleFormSubmission(savedJobQuery, subject, html);

    res.status(201).json(savedJobQuery);
  } catch (error) {
    console.error('Error creating job query:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export const GetJobQueryController = expressAsyncHandler(async (req, res) => {
  try {

    const referralID = req.params.referralID; 
    console.log(referralID)
   // Find the agent associated with the referral ID
   const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
  
    const JobQuerys = await JobQuery.find({agentId:agent.agentId});

    res.status(200).json({ agent, JobQuerys });
  } catch (error) {
    console.error('Error getting JobQuery Details:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
