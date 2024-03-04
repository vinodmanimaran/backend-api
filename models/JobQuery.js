import mongoose from "mongoose";

const JobQuerySchema = new mongoose.Schema(
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
      required:true,
    },
    District: {
      type: String,
      required:true,

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
