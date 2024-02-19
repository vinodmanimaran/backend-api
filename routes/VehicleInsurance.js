import express from 'express'
import { VehicleInsuranceController, getVehicleInsurance } from '../controllers/VechiceInsurance.js'

const VechicleInsuranceRoute=express.Router()

VechicleInsuranceRoute.post("/vechicleinsurance",VehicleInsuranceController)
VechicleInsuranceRoute.get("/getvechicleinsurance",getVehicleInsurance)


export default  VechicleInsuranceRoute