import mongoose from 'mongoose';
const dataSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },

    name: {
        type: String,
    },
    
    address: {
        type: String,
    },

    amount_due: {
        type: String,
    },

    currentmonth_usage: {
        type: String,
    },

    energy_from : {
        type: String,
    },

    plan: {
        type: String,
    },

    cne_accountid: {
        type: String,
    },

    utility_number: {
        type: String,
    },

    service_periods: {
        type: String,
    },

    statement_number: {
        type: String,
    },

    taxes: {
        type: String,
    },

    adjustment: {
        type: String,
    },

    trijunction_lineloses: {
        type: String,
    },

    electric_supplycharges: {
        type: String,
    },

    market_charges: {
        type: String,
    },

    udc_charges: {
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

export default mongoose.model("data", dataSchema)