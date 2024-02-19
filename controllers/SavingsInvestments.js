import SavingsInvestments from "../models/SavingsInvestments.js";
import expressAsyncHandler from 'express-async-handler';

export const SavingsInvestmentsController = expressAsyncHandler(async (req, res) => {
  try {
    const {
      name,
      mobile,
      alternate_number,
      place,
      district,
    } = req.body;

    const newSavingsInvestments = new SavingsInvestments({
      name,
      mobile,
      alternate_number,
      place,
      district,
    });

    const savedSavingsInvestments = await newSavingsInvestments.save();

    res.status(201).json(savedSavingsInvestments);
  } catch (error) {
    console.error('Error creating savings investments submission:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



export const getSavingsInvestment=expressAsyncHandler(async(req,res)=>{
  try {
    const SavingsInvestments=await SavingsInvestments.find()
    res.status(200).json({SavingsInvestments})
  } catch (error) {
    console.error(error.response.name)
    res.status(500).json({message:"Internal Server Error"})
  }
 
})