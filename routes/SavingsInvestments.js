import express from 'express'
import { SavingsInvestmentsController, getSavingsInvestment } from '../controllers/SavingsInvestments.js'

const SavingsInvestmentsRoute=express.Router()

SavingsInvestmentsRoute.post("/savinginvestment/:referralID",SavingsInvestmentsController)
SavingsInvestmentsRoute.get("/getsavinginvestment/:referralID",getSavingsInvestment)


export default  SavingsInvestmentsRoute