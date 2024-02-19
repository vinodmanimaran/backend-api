import express from 'express'
import { RealEstateController, getRealEstate } from '../controllers/RealEstate.js'

const RealEstateRoute =express.Router()

RealEstateRoute.post("/realestate",RealEstateController)
RealEstateRoute.get("/getrealestate",getRealEstate)


export default RealEstateRoute