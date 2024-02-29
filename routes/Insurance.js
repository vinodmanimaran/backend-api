import express from 'express'
import {InsuranceController, getInsurance } from '../controllers/Insurance.js'

const InsuranceRoute=express.Router()

InsuranceRoute.post("/insurance",InsuranceController)
InsuranceRoute.get("/getinsurance",getInsurance)


export default InsuranceRoute