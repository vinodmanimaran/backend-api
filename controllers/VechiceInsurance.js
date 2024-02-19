import VehicleInsurance from "../models/VehicleInsurance.js";
import expressAsyncHandler from 'express-async-handler';

export const VehicleInsuranceController = expressAsyncHandler(async (req, res) => {
  try {
    const {
      name,
      mobile,
      alternate_number,
      vehicle,
      place,
      district,
    } = req.body;

    const newVehicleInsurance = new VehicleInsurance({
      name,
      mobile,
      alternate_number,
      vehicle,
      place,
      district,
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
    const VehicleInsurances=await VehicleInsurance.find()
    res.status(200).json({VehicleInsurances})
  }catch(error){
    console.error(error.response.name)
    res.status(500).json({message:"Internal Server Error"})
  }
 
})