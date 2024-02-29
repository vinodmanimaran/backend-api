import express from 'express'
import { GetJobQueryController, JobQueryController } from '../controllers/JobQuery.js'

const JobQueryRoute=express.Router()

JobQueryRoute.post("/jobquery/:referralID",JobQueryController)
JobQueryRoute.get("/getjobquery/:referralID",GetJobQueryController)


export default  JobQueryRoute