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
  place: {
    type: String,
  },
  district: {
    type: String,
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Agent'
  }
}, { timestamps: true });

const CreditCard = mongoose.model("CreditCard", CreditCardSchema);

export default CreditCard;
