import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  alternate_number: {
    type: String,
  },
  amount:{
    type: Number,
  },
  Place: {
    type: String,
  },
  District: {
    type: String,
  },
  loan_type: {
    type: String,
    enum: ['Home Loan', 'Personal Loan', 'Business Loan', 'Loan against Property', 'Vehicle Loan', 'Vehicle Refinance', 'Gold Loan','Others']
  },
  agentId: {
    type: String, 
    ref: 'Agent'
  }
}, { timestamps: true });

const Loan = mongoose.model("Loans", LoanSchema);

export default Loan;
