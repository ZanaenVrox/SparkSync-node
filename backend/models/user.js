import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },

    email:{
        type: String,
    },
    
    name: {
        type: String,
    },

    phone_number: {
        type: String,
    },

    address: {
        type: String,
    },

    password: {
        type: String,
    },

    profile_image: {
        type: String,
    },
    status: {
        type: Number,
    },
    token: { 
        type: String,
    },
    otp: {
        type: Number,
    },
    isVerified: {
        type: Boolean, 
    },

    resetToken: {
        type: String,
    },

    resetTokenExpires: {
        type: Date,
    },

  },
    {
      timestamps: true,
    }
);

export default mongoose.model("user", userSchema)