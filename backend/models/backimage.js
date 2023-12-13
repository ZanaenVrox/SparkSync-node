import mongoose from "mongoose";
const backimageSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },

    user_id: {
      type: Number,
    },

    backimage: {
      type: String,
    },

    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("backimage", backimageSchema);
