import Agent from '../models/Agent.js';


export const createAgent = async (req, res) => {
    try {
        const { name, email, contactNumber,location,PAN_Number,Bank_Name,Aadhar_Number,Account_Number,IFSC_Code } = req.body;
        const newAgent = new Agent({ name, email, contactNumber, location,PAN_Number,Bank_Name,Aadhar_Number,Account_Number,IFSC_Code });
        await newAgent.save();
        res.status(201).json({ agent: newAgent});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const getAgent = async (req, res) => {
    const { id } = req.params;
    try {
        const agent = await Agent.findById(id); 
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        res.status(200).json(agent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAgent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, contactNumber, location } = req.body;
        const updatedAgent = { name, email, contactNumber, location };
        const agent = await Agent.findByIdAndUpdate(id, updatedAgent, { new: true });
        res.status(200).json(agent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAgent = async (req, res) => {
    try {
        const { id } = req.params;
        await Agent.findByIdAndRemove(id);
        res.status(200).json({ message: 'Agent deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllAgent = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.status(200).json({ message: "Agents retrieved successfully", agents });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


