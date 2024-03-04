import mongoose from "mongoose";

const CreditCardSchema = new mongoose.Schema({
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
  agentId: {
    type: String, 
    ref: 'Agent'
  }
}, { timestamps: true });

const CreditCard = mongoose.model("CreditCard", CreditCardSchema);

export default CreditCard;
