import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
const jwtSecret = process.env.JWT_SECRET || "Vinodkumar"; 
const Authrouter = Router();
let hardcodedAdmin;

const generateToken = (admin) => {
  const payload = {
    id: admin._id,
    username: admin.username,
    email: admin.email
  };

  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
};

const initializeHardcodedAdmin = async () => {
  try {
    hardcodedAdmin = await Admin.findOne({ username: "vinod" });
    if (!hardcodedAdmin) {
      const hashedPassword = await bcrypt.hash("manimaran", 10); 

      hardcodedAdmin = await Admin.create({
        username: "vinod",
        email: "vk5241415@gmail.com",
        password: hashedPassword
      });
    }
  } catch (error) {
    console.error("Error initializing hardcoded admin:", error);
  }
};

initializeHardcodedAdmin();

Authrouter.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const admin = await Admin.findOne({
      $or: [{ username: identifier }, { email: identifier }]
    });

    if (!admin) {
      return res.status(404).json({ error: 'Not Found', message: 'User not found.' });
    }

    const validateAdmin = await bcrypt.compare(password, admin.password);

    if (!validateAdmin) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid password.' });
    }

    req.session.user = admin;

    const token = generateToken(admin);

    res.status(200).json({ message: 'Login Success', token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error',error });
  }
});



Authrouter.post('/resetpassword', async (req, res) => {
  try {
    const { identifier, newPassword } = req.body;

    const admin = await Admin.findOne({
      $or: [{ username: identifier }, { email: identifier }]
    });

    if (!admin) {
      return res.status(404).json({ error: 'Not Found', message: 'User not found.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await Admin.findByIdAndUpdate(admin._id, { password: hashedPassword });


    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' ,error});
  }
});



Authrouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});



Authrouter.get("/checklogin",(req,res)=>{
  if(req.session && req.session.user){
    res.json({loggedIn:true})
  }else{
    res.json({loggedIn:false})
  }
})


Authrouter.get('/private', (req, res) => {
  // Check if user is authenticated
  if (req.session && req.session.user) {
    // Private route logic here
    res.status(200).json({ message: 'Private route accessed successfully' });
  } else {
    // User not authenticated
    res.status(401).json({ error: 'Unauthorized', message: 'Please login.' });
  }
});


export default Authrouter;
