import mongoose from 'mongoose';
const useradminSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },

    username: {
        type: String,
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

    facebook_profile: {
        type: String,
    },

    linkedin_profile: {
        type: String,
    },

    instagram_profile: {
        type: String,
    },

    twitter_profile: {
        type: String,
    },
    
    status: {
        type: Number,
    },
    
    

    resetToken: {
        type: String,
    },

  },
    {
      timestamps: true,
    }
);

export default mongoose.model("useradmin", useradminSchema)