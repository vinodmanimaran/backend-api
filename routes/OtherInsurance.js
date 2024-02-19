import express from 'express'
import { OtherInsuranceController, getOtherInsurance } from '../controllers/OtherInsurance.js'

const OtherInsuranceRoute=express.Router()

OtherInsuranceRoute.post("/otherinsurance",OtherInsuranceController)
OtherInsuranceRoute.get("/getotherinsurance",getOtherInsurance)


export default  OtherInsuranceRoute