import mongoose from "mongoose";
const frontimageSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },

    user_id: {
      type: Number,
    },

    frontimage: {
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

export default mongoose.model("frontimage", frontimageSchema);
