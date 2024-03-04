import mongoose from "mongoose";

const RealEstateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    mobile: {
      type: String,
    },
    alternate_number: {
      type: String,
    },
    purchaseOrSale: {
      type: String,
      enum:['Purchase',"Sale",'Others']
    },
    agreeOrCommercial: {
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
    },
    Estimated_value:{
      type:Number
    }
  },
  { timestamps: true }
);

const RealEstate = mongoose.model('RealEstate', RealEstateSchema);

export default RealEstate;
