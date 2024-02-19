import express from 'express'
import { GetLoan, LoanController } from '../controllers/Loans.js'

const LoanRoute=express.Router()

LoanRoute.post("/loans",LoanController)
LoanRoute.get("/getloans",GetLoan)


export default  LoanRoute