import CreditCard from "../models/CreditCard.js";
import expressAsyncHandler from 'express-async-handler';

export const CreditCardController = expressAsyncHandler(async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const {
      name,
      mobile,
      alternate_number,
      place,
      district,
    } = req.body;

    const newCreditCard = new CreditCard({
      name:name,
      mobile:mobile,
      alternate_number:alternate_number,
      place:place,
      district:district,
    });

    const savedCreditCard = await newCreditCard.save();
    console.log("Received Credit Card Data:", savedCreditCard);

    res.status(201).json(savedCreditCard);
  } catch (error) {
    console.error('Error creating credit card submission:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export const GetCreditCardController = expressAsyncHandler(async (req, res) => {
  try {

    const creditCards = await CreditCard.find();

    res.status(200).json({ creditCards });
  } catch (error) {
    console.error('Error getting CreditCard Details:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});