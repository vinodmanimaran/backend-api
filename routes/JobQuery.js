import express from 'express'
import { GetJobQueryController, JobQueryController } from '../controllers/JobQuery.js'

const JobQueryRoute=express.Router()

JobQueryRoute.post("/jobquery",JobQueryController)
JobQueryRoute.get("/getjobquery",GetJobQueryController)


export default  JobQueryRoute