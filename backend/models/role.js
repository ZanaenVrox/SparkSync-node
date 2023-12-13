import mongoose from 'mongoose';
const roleSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },

    user_id: {
        type: Number,
    },

    title:{
        type:String,
    },

    status: {
        type: Number,
      },

  },
    {
      timestamps: true,
    }
);

export default mongoose.model("role", roleSchema)