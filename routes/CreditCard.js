import express from 'express';
import { CreditCardController, GetCreditCardController } from '../controllers/CreditCard.js';
import CreditCard from "../models/CreditCard.js";
import Agent from '../models/Agent.js';
import expressAsyncHandler from 'express-async-handler';

const CreditCardRoute = express.Router();

CreditCardRoute.post("/creditcard/:referralID", CreditCardController);
CreditCardRoute.get("/getcreditcard/:referralID", GetCreditCardController);

export default CreditCardRoute;
