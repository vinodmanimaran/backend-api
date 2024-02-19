import express from 'express'
import { CreditCardController, GetCreditCardController} from '../controllers/CreditCard.js'

const CreditCardRoute=express.Router()

CreditCardRoute.post("/creditcard",CreditCardController)
CreditCardRoute.get("/getcreditcard",GetCreditCardController)


export default  CreditCardRoute