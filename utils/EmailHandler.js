import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import http from 'http';
import {Server} from 'socket.io';
import dotenv from 'dotenv'
const env=dotenv.config()

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.emit('message', 'Welcome to the form submission service!');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

export const handleFormSubmission = async (formData, customSubject, customText) => {
  try {
    const info = await transporter.sendMail({
      to: 'taylorbuzz20@gmail.com',
      subject: customSubject || 'New Form Submission', 
      html: customText || 'A new form has been submitted.', 
    });

    console.log(`Email sent: ${info.messageId}`);
    io.emit('newFormSubmitted', formData);
  } catch (error) {
    console.error(`Error handling form submission: ${error.message}`);
  }
};

export const formHandler = {
  handleFormSubmission,
  startServer: (port) => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  },
};
