import mongoose from "mongoose";

const user_properties = new mongoose.Schema(
  {
    user_id: {
      type: Number,
    },

    frontImage: {
      type: String,
    },
    backImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user_properties", user_properties);
