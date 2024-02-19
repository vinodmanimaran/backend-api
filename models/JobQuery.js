import mongoose from "mongoose";

const JobQuerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }, 
    mobile_number: {
      type: String,
      required: true,
    },
    alternate_number: {
      type: String,
      required: true,
    },
    Qualification: {
      type: String,
      required: true,
    },
    Experience: {
      type: String,
      required: true,
    },
    Country: {
      type: String,
      required: true,
    },
    Place: {
      type: String,
      required: true,
    },
    District: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const JobQuery = mongoose.model('JobQuery', JobQuerySchema);

export default JobQuery;
