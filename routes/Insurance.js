import express from 'express'
import {InsuranceController, getInsurance } from '../controllers/Insurance.js'

const InsuranceRoute=express.Router()

InsuranceRoute.post("/insurance/:referralID",InsuranceController)
InsuranceRoute.get("/getinsurance/:referralID",getInsurance)


export default InsuranceRoute