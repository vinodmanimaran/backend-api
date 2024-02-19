import mongoose from "mongoose";

const VehicleInsuranceSchema = new mongoose.Schema({
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
  vehicle: {
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

const VehicleInsurance = mongoose.model("VehicleInsurance", VehicleInsuranceSchema);

export default VehicleInsurance;
