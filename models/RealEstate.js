import mongoose from "mongoose";

const RealEstateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    alternateNumber: {
      type: String,
      required: true,
    },
    purchaseOrSale: {
      type: String,
      required: true,
    },
    agreeOrCommercial: {
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
  },
  { timestamps: true }
);

const RealEstate = mongoose.model('RealEstate', RealEstateSchema);

export default RealEstate;
