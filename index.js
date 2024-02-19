import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import mongoose from 'mongoose';
import QRCode from 'qrcode';
import path from 'path';
import cors from 'cors';
import geoip from 'geoip-lite';
import DeviceDetector from 'device-detector-js';
import bodyParser from 'body-parser';
import JobQuery from './models/JobQuery.js';
import Loans from './models/Loans.js';
import RealEstate from './models/RealEstate.js';
import CreditCard from './models/CreditCard.js';
import OtherInsurance from './models/OtherInsurances.js';
import SavingsInvestments from './models/SavingsInvestments.js';
import User from './models/User.js';
import VechicleInsurance from './models/VehicleInsurance.js';
import JobQueryRoute from './routes/JobQuery.js';
import RealEstateRoute from './routes/RealEstate.js';

import CreditCardRoute from './routes/CreditCard.js';
import OtherInsuranceRoute from './routes/OtherInsurance.js';

import SavingsInvestmentsRoute from './routes/SavingsInvestments.js';
import LoanRoute from './routes/Loans.js';
import VechicleInsuranceRoute from './routes/VehicleInsurance.js';
import AdminRoute from './routes/Admin.js';
import { fileURLToPath } from 'url';
import expressIp from 'express-ip';
import requestIp from 'request-ip';

import axios from 'axios';
import { dirname, join } from 'path';

dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors({ origin: '*' }));
app.use(requestIp.mw());

// MongoDB connection
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

// Dashboard endpoint to fetch data
app.get('/dashboard', async (req, res) => {
    try {
        const jobQueryData = await JobQuery.find();
        const loansData = await Loans.find();
        const creditCardData = await CreditCard.find();
        const realEstateData = await RealEstate.find();
        const savingsInvestmentsData = await SavingsInvestments.find();
        const otherInsurancesData = await OtherInsurance.find();
        const vehicleInsurancesData = await VechicleInsurance.find();

        const leadsCount = {
            jobs: jobQueryData.length,
            loans: loansData.length,
            creditCards: creditCardData.length,
            realEstate: realEstateData.length,
            savingsInvestments: savingsInvestmentsData.length,
            otherInsurances: otherInsurancesData.length,
            vehicleInsurances: vehicleInsurancesData.length,
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
            loans: loansData,
            creditCards: creditCardData,
            realEstate: realEstateData,
            savings: savingsInvestmentsData,
            others: otherInsurancesData,
            vehicle: vehicleInsurancesData,
        };

        res.status(200).send({ data: categorizedData, leadsCount, leadsPercentage, page: 'dashboard' });
    } catch (error) {
        console.error('Error fetching data for dashboard:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint to generate and serve QR code for signup
app.get('/qr/signup', async (req, res) => {
    try {
        const token = Math.random().toString(36).substr(2, 8);
        console.log('Signup Token:', token);
        const qrCodeURL = `https://yourdomain.com/qr/signup/${token}`;
        const filePath = path.join(__dirname, 'output', 'file.png');
        await QRCode.toFile(filePath, qrCodeURL, { errorCorrectionLevel: 'H' });

        const { geoLocation, deviceInfo } = await extractLocationAndDevice(req);

        // Save user information to the database
        await saveUserInfoToDatabase(geoLocation, deviceInfo)


        res.sendFile(filePath)
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).send('Internal Server Error');
    }
});


async function extractLocationAndDevice(req) {
    try {
        const ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

        // Handling IPv6 address format (::1)
        let ip = ipAddress;
        if (ipAddress.includes('::ffff:')) {
            // Convert IPv4-mapped IPv6 address to IPv4 format
            ip = ipAddress.split(':').pop();
        }
        
        // Now you can use the 'ip' variable to handle both IPv4 and IPv6 addresses
        // Example usage:
        console.log('User IP address:', ip);
                // Make a request to the IP geolocation API
        const response = await axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=a3c3277c2a5441f69d516ee0e4276fec&ip_address=${ip}`);
        const geoLocation = response.data;
   
        if (!geoLocation) {
            throw new Error('Location information not available');
        }

        const userAgent = req.headers['user-agent'];
        const deviceDetector = new DeviceDetector();
        const device = deviceDetector.parse(userAgent);

        const deviceInfo = {
            deviceID: userAgent,
            deviceType: device.device?.type,
            os: device.os?.name,
            browser: device.client?.name,
        };

        console.log('Device ID:', deviceInfo.deviceID);
        console.log('Location:', geoLocation);

        return { geoLocation, deviceInfo };
    } catch (error) {
        console.error('Error extracting location and device:', error);
        throw error; // Rethrow the error to be caught by the calling function
    }
}



async function saveUserInfoToDatabase(geoLocation, deviceInfo) {
    try {
        const user = new User({
            location: {
                country: geoLocation.country,
                city: geoLocation.city,
            },
            ...deviceInfo,
        });
        await user.save();
        console.log('User information saved successfully');
    } catch (error) {
        console.error('Error saving user information:', error);
    }
}

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
});

app.use("/auth", AdminRoute);
app.use("/others", JobQueryRoute);
app.use("/services", RealEstateRoute);
app.use("/services", CreditCardRoute);
app.use("/services", LoanRoute);
app.use("/services", SavingsInvestmentsRoute);
app.use("/services", OtherInsuranceRoute);
app.use("/services", VechicleInsuranceRoute);

app.listen(port, () => {
    console.log(`The Server is on ${port}`);
});
