import mongoose from 'mongoose';
const permissionSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },

    permission:{
        type: String,
    },

    status: {
        type: Number,
      },

  },
    {
      timestamps: true,
    }
);

export default mongoose.model("permission", permissionSchema)