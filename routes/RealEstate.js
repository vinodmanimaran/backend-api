import express from 'express'
import { RealEstateController, getRealEstate } from '../controllers/RealEstate.js'

const RealEstateRoute =express.Router()

RealEstateRoute.post("/realestate/:referralID",RealEstateController)
RealEstateRoute.get("/getrealestate/:referralID",getRealEstate)


export default RealEstateRoute