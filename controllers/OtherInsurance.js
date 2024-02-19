import OtherInsurance from "../models/OtherInsurances.js";
import expressAsyncHandler from 'express-async-handler';

export const OtherInsuranceController = expressAsyncHandler(async (req, res) => {
  try {
    const {
      name,
      mobile,
      alternate_number,
      place,
      district,
    } = req.body;

    const newOtherInsurance = new OtherInsurance({
      name,
      mobile,
      alternate_number,
      place,
      district,
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
    const OtherInsurances=await OtherInsurance.find()
    res.status(200).json({OtherInsurances})
  } catch (error) {
    console.error( error.response.name);
    res.status(500).json({ message: "Internal Server Error" });
  }
})