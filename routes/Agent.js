import express from 'express';
import { createAgent, getAgent, updateAgent, deleteAgent, getAllAgent } from '../controllers/Agent.js';
import { trackAnalytics, getAnalytics } from '../controllers/Analytics.js';

const router = express.Router();

router.post('/createagents', createAgent,trackAnalytics);
router.get('/getagent/:id', getAgent,getAnalytics);
router.get("/getallagent",getAllAgent,getAnalytics)
router.put('/agents/:id', updateAgent);
router.delete('/agents/:id', deleteAgent);





export default router;
