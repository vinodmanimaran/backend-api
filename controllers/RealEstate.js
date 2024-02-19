import RealEstate from "../models/RealEstate.js";
import expressAsyncHandler from 'express-async-handler';

export const RealEstateController = expressAsyncHandler(async (req, res) => {
  try {
    const {
      name,
      mobileNumber,
      alternateNumber,
      purchaseOrSale,
      agreeOrCommercial,
      place,
      district,
    } = req.body;

    const newRealEstate = new RealEstate({
      name,
      mobileNumber,
      alternateNumber,
      purchaseOrSale,
      agreeOrCommercial,
      place,
      district,
    });

    const savedRealEstate = await newRealEstate.save();

    res.status(201).json(savedRealEstate);
  } catch (error) {
    console.error('Error creating real estate submission:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export const getRealEstate=expressAsyncHandler(async(req,res)=>{
  try {
    const RealEstates=await RealEstate.find()
    res.status(200).json({getRealEstates})
  } catch (error) {
    console.error(error.response.name)
    res.status(500).json({message:"Internal Server Error"})
  }
})