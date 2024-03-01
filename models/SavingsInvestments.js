import mongoose from "mongoose";

const SavingsInvestmentSchema = new mongoose.Schema({
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
  Estimated_saving_amount:{
    type:Number
  },
  agentId: {
    type: String, 
    ref: 'Agent'
  }
}, { timestamps: true });

const SavingsInvestments = mongoose.model("SavingsInvestments", SavingsInvestmentSchema);

export default SavingsInvestments;
