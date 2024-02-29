import express from 'express'
import { OtherInsuranceController, getOtherInsurance } from '../controllers/OtherInsurance.js'

const OtherInsuranceRoute=express.Router()

OtherInsuranceRoute.post("/otherinsurance/:referralID",OtherInsuranceController)
OtherInsuranceRoute.get("/getotherinsurance/:referralID",getOtherInsurance)


export default  OtherInsuranceRoute