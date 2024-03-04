import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';

import JobQueryRoute from './routes/JobQuery.js';
import RealEstateRoute from './routes/RealEstate.js';
import CreditCardRoute from './routes/CreditCard.js';
import SavingsInvestmentsRoute from './routes/SavingsInvestments.js';
import LoanRoute from './routes/Loans.js';
import VehicleInsuranceRoute from './routes/VehicleInsurance.js';
import JobQuery from './models/JobQuery.js';
import Loan from './models/Loans.js';
import CreditCard from './models/CreditCard.js';
import RealEstate from './models/RealEstate.js';
import SavingsInvestments from './models/SavingsInvestments.js';
import VehicleInsurance from './models/VehicleInsurance.js';
import AgentRouter from './routes/Agent.js';
import InsuranceRoute from './routes/Insurance.js';
import Insurance from './models/Insurance.js';
import Authrouter from './controllers/Auth.js';

dotenv.config();
const app = express();
const savingstitle = "Microsavings & Investments";
const RealEstatetitle = "RealEstate";
const CreditCardtitle = "CreditCard";
const vehicleInsurancestitle="VehicleInsurance"
const oneWeek = 7 * 24 * 60 * 60 * 1000;
app.use(express.json());
app.use(bodyParser.json());

app.set("trust proxy", 1);

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  proxy: true,
  name: 'PEEJIYEM',
  cookie: {
    maxAge: oneWeek,
    sameSite: 'none',
    httpOnly: false,
    secure: true,
  }
}));

// https://pygeemadmin.vercel.app', 

const port = process.env.PORT || 5000;

const corsOptions = {
  origin: ['http://localhost:5173'],
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
app.get('/dashboard', requireLogin, async (req, res) => {
  try {
      const jobQueryData = await JobQuery.find();
      const loansData = await Loan.find();
      const creditCardData = await CreditCard.find();
      const realEstateData = await RealEstate.find();
      const savingsInvestmentsData = await SavingsInvestments.find();
      const vehicleInsurancesData = await VehicleInsurance.find();
      const insuranceData = await Insurance.find();

      // Calculate total data count
      const leadsCount = {
          Jobs: jobQueryData.length,
          Loans: loansData.length,
          CreditCard: creditCardData.length,
        [RealEstatetitle]: realEstateData.length,
          [savingstitle]: savingsInvestmentsData.length,
        [RealEstatetitle]: vehicleInsurancesData.length,
          Insurance: insuranceData.length
      };

      const totalDataCount = Object.values(leadsCount).reduce((acc, val) => acc + val, 0);

      const startDate = new Date('2024-02-14'); 
      const endDate = new Date(); 
      const oneDay = 1000 * 60 * 60 * 24; 
      const liveDuration = Math.floor((endDate - startDate) / oneDay);

 let averagePerDay = totalDataCount / liveDuration;
 
averagePerDay = averagePerDay.toFixed(2);


      const totalServices = Object.keys(leadsCount).length;
      const leadsPercentage = {};
      for (const key in leadsCount) {
          if (leadsCount[key] !== 0) {
              leadsPercentage[key] = ((leadsCount[key] / totalDataCount) * 100).toFixed(2);
          } else {
              leadsPercentage[key] = 0;
          }
      }

      const totalDataCountPercentage = ((totalDataCount / (totalServices * liveDuration)) * 100).toFixed(2);

      const categorizedData = {
          Jobs: jobQueryData,
          Loans: loansData,
       [CreditCardtitle]: creditCardData,
          [RealEstatetitle]: realEstateData,
          [savingstitle]: savingsInvestmentsData,
        [vehicleInsurancestitle]: vehicleInsurancesData,
          Insurance: insuranceData
      };

      res.status(200).send({
          data: categorizedData,
          leadsCount,
          leadsPercentage,
          totalDataCount,
          totalDataCountPercentage,
          liveDuration,
          averagePerDay,
          page: 'dashboard'
      });
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
app.use("/services", VehicleInsuranceRoute);
app.use("/agent", AgentRouter, requireLogin);


app.listen(port, () => {
    console.log(`The Server is on ${port}`);
});
