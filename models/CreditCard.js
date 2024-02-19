import mongoose from "mongoose";

const CreditCardSchema = new mongoose.Schema({
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

const CreditCard = mongoose.model("CreditCard", CreditCardSchema);

export default CreditCard;
