import Insurance from "../models/Insurance.js";
import expressAsyncHandler from 'express-async-handler';

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

    const newInsurance = new Insurance({
      name,
      mobile,
      alternate_number,
      place,
      district,
      insurance_type
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
    const Insurances=await Insurance.find()
    res.status(200).json({VehicleInsurances})
  }catch(error){
    console.error(error.response.name)
    res.status(500).json({message:"Internal Server Error"})
  }
 
})