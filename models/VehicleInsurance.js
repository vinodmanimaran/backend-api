import mongoose from "mongoose";

const VehicleInsuranceSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  alternate_number: {
    type: String,
  },
  vehicle: {
    type: String,
    enum:["Bike", "Car", "Van", "School Bus", "Commercial vehicles", "Others"]
  },
  place: {
    type: String,
  },
  district: {
    type: String,
  },
}, { timestamps: true });

const VehicleInsurance = mongoose.model("VehicleInsurance", VehicleInsuranceSchema);

export default VehicleInsurance;
