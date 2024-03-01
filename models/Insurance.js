import mongoose from "mongoose";

const InsuranceSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  alternate_number: {
    type: String,
  },
  place: {
    type: String,
  },
  district: {
    type: String,
  },
  insurance_type: {
    type: String,
    enum: ['Health Insurance', 'Life Insurance', 'General Insurance','Others']
  },

  agentId: {
    type: String, 
    ref: 'Agent'
  }
}, { timestamps: true });

const Insurance = mongoose.model("Insurance", InsuranceSchema);

export default Insurance;
