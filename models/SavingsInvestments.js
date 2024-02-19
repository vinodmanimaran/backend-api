import mongoose from "mongoose";

const SavingsInvestmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  alternate_number: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const SavingsInvestments = mongoose.model("SavingsInvestments", SavingsInvestmentSchema);

export default SavingsInvestments;
