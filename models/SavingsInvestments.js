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
  Place: {
    type: String,
  },
  District: {
    type: String,
  },
  savingamount:{
    type:String
  },
  agentId: {
    type: String, 
    ref: 'Agent'
  }
}, { timestamps: true });

const SavingsInvestments = mongoose.model("SavingsInvestments", SavingsInvestmentSchema);

export default SavingsInvestments;
