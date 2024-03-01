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
      place,
      OtherVehicle,
      district,
    } = req.body;

    const referralID = req.params.referralID; 
    console.log(referralID)

    const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
    if (!agent) {
        return res.status(404).json({ message: "Agent not found for the provided referral ID" });
    }


    const newVehicleInsurance = new VehicleInsurance({
      name,
      mobile,
      alternate_number,
      vehicle,
      place,
      district,
      OtherVehicle,
      agentId:agent.agentId
    });

    const savedVehicleInsurance = await newVehicleInsurance.save();

    res.status(201).json(savedVehicleInsurance);
  } catch (error) {
    console.error('Error creating vehicle insurance submission:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export const getVehicleInsurance=expressAsyncHandler(async(req,res)=>{
  try{
    const referralID = req.params.referralID; 
    console.log(referralID)
   const agent = await Agent.findOne({ uniqueURL: { $regex: `.*${referralID}.*` } });
    const VehicleInsurances=await VehicleInsurance.find({agentId:agent.agentId})
    res.status(200).json({agent,VehicleInsurances})
  }catch(error){
    console.error(error.response.name)
    res.status(500).json({message:"Internal Server Error"})
  }
 
})