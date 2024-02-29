import mongoose from "mongoose";

const JobQuerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    }, 
    mobile_number: {
      type: Number,
    },
    alternate_number: {
      type: Number,
    },
    Qualification: {
      type: String,
    },
    Experience: {
      type: String,
    },
    Country: {
      type: String,
    },
    Place: {
      type: String,
    },
    District: {
      type: String,
    },
  },
  { timestamps: true }
);

const JobQuery = mongoose.model('JobQuery', JobQuerySchema);

export default JobQuery;
