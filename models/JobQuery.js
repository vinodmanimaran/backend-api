import mongoose from "mongoose";

const JobQuerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    }, 
    mobile: {
      type: String, // Change type to String
    },
    alternate_number: {
      type: String, // Change type to String if necessary
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
  },
  { timestamps: true }
);

const JobQuery = mongoose.model('JobQuery', JobQuerySchema);

export default JobQuery;
