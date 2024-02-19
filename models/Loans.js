import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema({
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
  amount:{
  type:Number,
  required:true
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

const Loan = mongoose.model("Loans", LoanSchema);

export default Loan;
