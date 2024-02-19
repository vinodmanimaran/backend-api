import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwtSecret ="Vinodkumar";

const generateToken = (admin) => {
  const payload = {
    id: admin._id,
    username: admin.username,
  };

  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
};




export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin with this email already exists' });
    }

    const newAdmin = new Admin({ username, email, password: password });
     const newAdminCreated=await newAdmin.save();


    res.status(201).json({ message: ' New Admin created successfully',newAdminCreated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const login = async (req, res) => {
    try {
        // Validate request body
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ error: 'BAD_REQUEST', message: 'Email and password are required.' });
        }

        // Find the admin by email
        const admin = await Admin.findOne({ email: req.body.email });

        if (!admin) {
            return res.status(404).json({ error: 'USER_NOT_FOUND', message: 'User not found.' });
        }

        // Compare passwords
        const validateAdmin = await bcrypt.compare(req.body.password, admin.password);
        console.log('Input Password:', req.body.password);
        console.log('Hashed Password:', admin.password);
        console.log('Password Validation Result:', validateAdmin);
        
        if (!validateAdmin) {
            return res.status(401).json({ error: 'WRONG_PASSWORD', message: 'Wrong password.' });
        }

        // TODO: Generate and send JWT token if needed
        const token = generateToken(admin);

        // Destructure the admin object excluding the password
        const { password, ...others } = admin._doc;

        // TODO: Log successful login attempts

        res.status(200).json({ message: 'Login Success', user: others,token });
    } catch (error) {
        // Log the error for debugging purposes
        console.error(error);

        // Handle specific error types
        if (error.name === 'ValidationError') {
            return res.status(422).json({ error: 'VALIDATION_ERROR', message: error.message });
        }

        // Handle MongoDB duplicate key error (E11000)
        if (error.code === 11000) {
            return res.status(409).json({ error: 'DUPLICATE_KEY_ERROR', message: 'Duplicate key violation.' });
        }

        // Handle other Mongoose-specific errors
        if (error.name === 'MongoError') {
            if (error.code === 121) {
                return res.status(400).json({ error: 'INVALID_MONGO_ID', message: 'Invalid MongoDB ID.' });
            } else if (error.code === 66) {
                return res.status(400).json({ error: 'INVALID_MONGO_QUERY', message: 'Invalid MongoDB query.' });
            }
        }

        // Handle unexpected errors
        if (error instanceof SyntaxError && error.message.includes('JSON')) {
            return res.status(400).json({ error: 'INVALID_JSON', message: 'Invalid JSON format in the request.' });
        }

        // Respond with a generic error message for other errors
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Internal server error occurred.' });
    }
};

export const logout = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};
