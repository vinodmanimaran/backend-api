import mongoose from "mongoose";

const OtherInsuranceSchema = new mongoose.Schema({
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
  agentId: {
    type: String, 
    ref: 'Agent'
  }
}, { timestamps: true });

const OtherInsurance = mongoose.model("OtherInsurance", OtherInsuranceSchema);

export default OtherInsurance;
