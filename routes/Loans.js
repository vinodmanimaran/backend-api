import express from 'express'
import { GetLoan, LoanController } from '../controllers/Loans.js'

const LoanRoute=express.Router()

LoanRoute.post("/loans/:referralID",LoanController)
LoanRoute.get("/getloans/:referralID",GetLoan)


export default  LoanRoute