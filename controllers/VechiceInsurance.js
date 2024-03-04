import expressAsyncHandler from 'express-async-handler';
import Agent from '../models/Agent.js';
import VehicleInsurance from '../models/VehicleInsurance.js';

export const VehicleInsuranceController = expressAsyncHandler(async (req, res) => {
  try {
    const {
      name,
      mobile,
      alternate_number,
      vehicle,
      Place,
      OtherVehicle,
      District,
    } = req.body;

    const referralID = req.params.referralID; 

    const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
    if (!agent) {
        return res.status(404).json({ message: "Agent not found for the provided referral ID" });
    }


    const newVehicleInsurance = new VehicleInsurance({
      name,
      mobile,
      alternate_number,
      vehicle,
      Place,
      District,
      OtherVehicle,
      agentId:agent.agentId
    });

    const savedVehicleInsurance = await newVehicleInsurance.save();

    res.status(201).json(savedVehicleInsurance);
  } catch (error) {
    res.status(500).json({ message: error.message });

  }
});


export const getVehicleInsurance=expressAsyncHandler(async(req,res)=>{
  try{
    const referralID = req.params.referralID; 
   const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
    const VehicleInsurances=await VehicleInsurance.find({agentId:agent.agentId})
    res.status(200).json({agent,VehicleInsurances})
  }catch(error){
    res.status(500).json({ message: error.message });
  }
 
})