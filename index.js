import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import DeviceDetector from 'device-detector-js';
import bodyParser from 'body-parser';
import User from './models/User.js';
import { fileURLToPath } from 'url';
import session from 'express-session';
import JobQueryRoute from './routes/JobQuery.js';
import RealEstateRoute from './routes/RealEstate.js';
import CreditCardRoute from './routes/CreditCard.js';
import SavingsInvestmentsRoute from './routes/SavingsInvestments.js';
import LoanRoute from './routes/Loans.js';
import VechicleInsuranceRoute from './routes/VehicleInsurance.js';
import JobQuery from './models/JobQuery.js';
import Loan from './models/Loans.js';
import CreditCard from './models/CreditCard.js';
import RealEstate from './models/RealEstate.js';
import SavingsInvestments from './models/SavingsInvestments.js';
import VehicleInsurance from './models/VehicleInsurance.js';
import AgentRouter from './routes/Agent.js' 
import InsuranceRoute from './routes/Insurance.js';
import Insurance from './models/Insurance.js';
import Authrouter from './controllers/Auth.js';

dotenv.config();
const app = express();
const oneWeek = 7 * 24 * 60 * 60 * 1000;
app.use(express.json());
app.use(bodyParser.json());
app.set("trust proxy", 1);
app.use(session({
  secret: 'secret',
  resave: false,    
  saveUninitialized: true,
  proxy:true,
  name:'PEEJIYEM',
  cookie:{
    maxAge: oneWeek, 
    sameSite: 'none',
    httpOnly: false,
    secure:true
  }
}));


const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const corsOptions = {
  origin: ['https://pygeemadmin.vercel.app','http://localhost:5173'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));





try {
    const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/your_database';
    await mongoose.connect(DB_URL);
    console.log('Connected to MongoDB');
} catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
}

app.use(morgan('combined'));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
});

const requireLogin = (req, res, next) => {
  if (req.session && req.session.user) {
      next();
  } else {
      res.status(401).json({ error: 'Unauthorized: Login required' });
  }
};


app.use("/auth", Authrouter);
app.get('/dashboard',requireLogin, async (req, res) => {
  console.log('Session User:', req.session.user);
    try {
      // Fetch data from different models
      const jobQueryData = await JobQuery.find();
      const loansData = await Loan.find();
      const creditCardData = await CreditCard.find();
      const realEstateData = await RealEstate.find();
      const savingsInvestmentsData = await SavingsInvestments.find();
      const vehicleInsurancesData = await VehicleInsurance.find();
    const InsuranceData=await Insurance.find()
      // Calculate leads count and percentage
      const leadsCount = {
        jobs: jobQueryData.length,
        loans: loansData.length,
        creditCards: creditCardData.length,
        realEstate: realEstateData.length,
        savingsInvestments: savingsInvestmentsData.length,
        vehicleInsurances: vehicleInsurancesData.length,
        InsuranceData:InsuranceData.length
      };
  
      const totalServices = Object.keys(leadsCount).length;
      const leadsPercentage = {};
  
      for (const key in leadsCount) {
        if (leadsCount[key] !== 0) {
          leadsPercentage[key] = ((leadsCount[key] / totalServices) * 100).toFixed(2);
        } else {
          leadsPercentage[key] = 0;
        }
      }
  
      const categorizedData = {
        jobs: jobQueryData,
        insurance:InsuranceData,
        loans: loansData,
        creditCards: creditCardData,
        realEstate: realEstateData,
        savings: savingsInvestmentsData,
        vehicle: vehicleInsurancesData,
      };
  
      res.status(200).send({ data: categorizedData, leadsCount, leadsPercentage, page: 'dashboard' });
    } catch (error) {
      console.error('Error fetching data for dashboard:', error);
      res.status(500).send('Internal Server Error');
    }
  });
app.use("/others", JobQueryRoute);
app.use("/services", RealEstateRoute);
app.use("/services", CreditCardRoute);
app.use("/services", LoanRoute);
app.use("/services", InsuranceRoute);
app.use("/services", SavingsInvestmentsRoute);
app.use("/services", VechicleInsuranceRoute);
app.use("/agent",AgentRouter,requireLogin)


app.listen(port, () => {
    console.log(`The Server is on ${port}`);
});
