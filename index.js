import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import mongoose from 'mongoose';
import QRCode from 'qrcode';
import path from 'path';
import cors from 'cors';
import DeviceDetector from 'device-detector-js';
import bodyParser from 'body-parser';
import User from './models/User.js';
import { fileURLToPath } from 'url';
import requestIp from 'request-ip';

// Import routes
import JobQueryRoute from './routes/JobQuery.js';
import RealEstateRoute from './routes/RealEstate.js';
import CreditCardRoute from './routes/CreditCard.js';
import OtherInsuranceRoute from './routes/OtherInsurance.js';
import SavingsInvestmentsRoute from './routes/SavingsInvestments.js';
import LoanRoute from './routes/Loans.js';
import VechicleInsuranceRoute from './routes/VehicleInsurance.js';
import AdminRoute from './routes/Admin.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        // Fetch data from different models
        const jobQueryData = await JobQuery.find();
        const loansData = await Loans.find();
        const creditCardData = await CreditCard.find();
        const realEstateData = await RealEstate.find();
        const savingsInvestmentsData = await SavingsInvestments.find();
        const otherInsurancesData = await OtherInsurance.find();
        const vehicleInsurancesData = await VechicleInsurance.find();

        // Calculate leads count and percentage
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

        // Prepare categorized data
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







app.get("/qr", async (req, res) => {
    try {
        const redirectURL = "https://leads-website.vercel.app/";
        const qrCodeURL = `https://backend-leads-8rdm.onrender.com/qr/redirect`;
        const filePath = path.join(__dirname, 'output', 'file.png');
        await QRCode.toFile(filePath, qrCodeURL, { errorCorrectionLevel: 'H' });
        res.sendFile(filePath);
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/qr/redirect', async (req, res) => {
    try {
        const { deviceInfo } = await extractDeviceInfo(req);
        await saveUserInfoToDatabase(deviceInfo);
        const redirectURL = "https://peejiyem.vercel.app";
        res.redirect(redirectURL);
    } catch (error) {
        console.error('Error redirecting:', error);
        res.status(500).send('Internal Server Error');
    }
})
async function extractDeviceInfo(req) {
    try {
        // Extract device information
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

        return { deviceInfo };
    } catch (error) {
        console.error('Error extracting device information:', error);
        throw error;
    }
}

async function saveUserInfoToDatabase(req, deviceInfo) {
    try {
        const ipAddress = req.clientIp;

        const user = new User({
            ipAddress,
            deviceID: deviceInfo.deviceID,
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

app.get('/', (req, res) => {
    res.send('Welcome to the home page');
});

app.listen(port, () => {
    console.log(`The Server is on ${port}`);
});
