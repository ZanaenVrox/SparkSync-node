import mongoose from 'mongoose';
const rolehaspermissionSchema = new mongoose.Schema(
  {
    id: {
        type: Number,
    },

    role_id: {
        type: Number,
    },

    permission_id:{
        type: Array,
    },

  },
    {
      timestamps: true,
    }
);

export default mongoose.model("rolehaspermission", rolehaspermissionSchema)