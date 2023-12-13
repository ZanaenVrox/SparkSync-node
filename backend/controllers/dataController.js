import Data from '../models/data.js';


const createData = async (req, res) =>{
  try {
  const iddd = await Data.find().sort({ id: -1 }).limit(1);
  let idd = 0;
  if (iddd.length > 0 && iddd[0].id) {
    idd = iddd[0].id;
  }
  var incId = idd + 1;

  

      const data = await new Data ({
       id: incId,
       name: req.body.name,
       address: req.body.address,
       amount_due: req.body.amount_due,
       currentmonth_usage: req.body.currentmonth_usage,
       energy_from: req.body.energy_from,
       plan: req.body.plan,
       cne_accountid: req.body.cne_accountid,
       utility_number: req.body.utility_number,
       service_periods: req.body.service_periods,
       statement_number: req.body.statement_number,
       taxes: req.body.taxes,
       adjustment: req.body.adjustment,
       trijunction_lineloses: req.body.trijunction_lineloses,
       electric_supplycharges: req.body.electric_supplycharges,
       market_charges: req.body.market_charges,
       udc_charges: req.body.udc_charges,
       status: req.body.status,
      });

      const dat = await data.save();

      
       
      

      res.status(200).json("Data has been added...");
} catch(err){
   res.status(500).json(err);
}
};




const getDataDetail = async (req, res) => {
  try{
    
      const id = req.params.id;
      const data = await Data.findOne({"id":id});
      res.status(200).json(data);
  }
  catch (err){
      res.status(500).json(err);
  }
};


const deleteData = async (req, res) => {
  try{
      const id = req.params.id;
      const data = await Data.deleteOne({"id":id});
      res.status(200).json('Data has been deleted');
  }
  catch (err){
      res.status(500).json(err);
  }
};


const updateData = async (req, res) => {
    try {
        
      

      const id  = req.params.id; 
      const data =  await Data.findOne({"id":id});
      data.name = req.body.name;
      data.address = req.body.address;
      data.amount_due = req.body.amount_due;
      data.currentmonth_usage = req.body.currentmonth_usage;
      data.energy_from = req.body.energy_from;
      data.plan = req.body.plan;
      data.cne_accountid = req.body.cne_accountid;
      data.utility_number = req.body.utility_number;
      data.service_periods = req.body.service_periods;
      data.statement_number = req.body.statement_number;
      data.taxes = req.body.taxes;
      data.adjustment = req.body.adjustment;
      data.trijunction_lineloses = req.body.trijunction_lineloses;
      data.electric_supplycharges = req.body.electric_supplycharges;
      data.market_charges = req.body.market_charges;
      data.udc_charges = req.body.udc_charges;
      data.status = req.body.status;
      const updateddata = await data.save();

      
      res.status(200).json(updateddata);
    } catch (err) {
      res.status(500).json(err);
    }
  };

const getData =  async (req, res) => {
  try {
    const data = await Data.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } 
  catch (err) {
    res.status(500).json(err);
  }
};


const updateStatus = async (req, res) => {
    try{
        const id= req.params.id;
        const data = await Data.findOne({"id": id});
        let st = "";
        if(data.status == 1){
          st=0;
        }else{
          st= 1;
        }
        
        var updatedStatus = {status: st };
        
        const updatedstatus = await Data.updateOne({"id" : id}, {
        $set: updatedStatus,
        });
        res.status(200).json("Status Updated");
        }
        catch (err)
        {
          res.status(200).json("Status Not Updated");
        }
};

export {createData, deleteData, getData, updateData, getDataDetail, updateStatus };