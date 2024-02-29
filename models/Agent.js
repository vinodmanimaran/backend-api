import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import qrcode from 'qrcode';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'taylorbuzz20@gmail.com',
        pass: 'jqxylfkzlsmvdbyx'
    }
});

const agentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    uniqueURL: {
        type: String,
        unique: true
    },
    qrCode: {
        type: String,
    }
});

const sendEmailWithQRCode = async (agent) => {
    const mailOptions = {
        from: 'taylorbuzz20@gmail.com', // Update this to your email address
        to: agent.email,
        subject: 'Your QR Code',
        text: 'Attached is your QR Code.',
       html:`

       <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your QR Code</title>
    <style>
        /* Inline CSS styles */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            border: 2px solid #eaeaea;
        }
        h1 {
            color: #333333;
            text-align: center;
            margin-top: 0;
            margin-bottom: 20px;
        }
        p {
            color: #666666;
            font-size: 18px;
            line-height: 1.6;
            margin-bottom: 10px;
        }
        .qr-code {
            text-align: center;
            margin-top: 30px;
        }
        /* Premium look styles */
        .container {
            background-color: #f9f9f9;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
            border: 3px solid #e0e0e0;
        }
        h1 {
            color: #333333;
            font-size: 28px;
        }
        p {
            color: #444444;
            font-size: 20px;
        }
        .qr-code img {
            max-width: 80%;
            border-radius: 12px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .signature {
            text-align: center;
            margin-top: 30px;
            font-size: 22px;
            color: #333333;
        }
    </style>
</head>
<body>
<div class="container">
    <h1>Your QR Code</h1>
    <p>Hello ${agent.name},</p>
    <p>Thank you for registering as our agent. Here is your unique QR code:</p>
   
    <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>
    <p class="signature">Best Regards,<br/>PEEJIYEM</p>
</div>
</body>
</html>
`,
        attachments: [{
            filename: 'qr_code.png',
            content: Buffer.from(agent.qrCode.split(';base64,').pop(), 'base64'), 
            encoding: 'base64'
        }]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

agentSchema.pre('save', async function(next) {
    const agent = this;
    if (!agent.uniqueURL) {
        const frontendURL = 'https://pygeem-client.vercel.app'; 
        const referralID = uuidv4();
        agent.uniqueURL = `${frontendURL}/referral/${referralID}`;
    }
    if (!agent.qrCode) {
        const qrData = await qrcode.toDataURL(agent.uniqueURL);
        agent.qrCode = qrData;
        sendEmailWithQRCode(agent);
    }
    next();
});

const Agent = mongoose.model('Agent', agentSchema);

export default Agent;
