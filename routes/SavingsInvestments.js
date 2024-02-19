import express from 'express'
import { SavingsInvestmentsController, getSavingsInvestment } from '../controllers/SavingsInvestments.js'

const SavingsInvestmentsRoute=express.Router()

SavingsInvestmentsRoute.post("/savinginvestment",SavingsInvestmentsController)
SavingsInvestmentsRoute.get("/getsavinginvestment",getSavingsInvestment)


export default  SavingsInvestmentsRoute