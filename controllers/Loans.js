import Loan from "../models/Loans.js";
import expressAsyncHandler from 'express-async-handler';

export const LoanController = expressAsyncHandler(async (req, res) => {
  try {
    const {
      name,
      mobile,
      alternate_number,
      amount,
      place,
      district,
    } = req.body;

    const newLoan = new Loan({
      name,
      mobile,
      alternate_number,
      amount,
      place,
      district,
    });

    const savedLoan = await newLoan.save();

    res.status(201).json(savedLoan);
  } catch (error) {
    console.error('Error creating loan submission:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
export const GetLoan=expressAsyncHandler(async(req,res)=>{
  try {
    const Loans=await Loan.find()
    res.status(200).json({Loans})
  } catch (error) {
    console.error(error.response.name)
    res.status(500).json({message:"Internal Server error"})
  }
})