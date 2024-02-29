import express from 'express'
import { VehicleInsuranceController, getVehicleInsurance } from '../controllers/VechiceInsurance.js'

const VechicleInsuranceRoute=express.Router()

VechicleInsuranceRoute.post("/vechicleinsurance/:referralID",VehicleInsuranceController)
VechicleInsuranceRoute.get("/getvechicleinsurance/:referralID",getVehicleInsurance)


export default  VechicleInsuranceRoute