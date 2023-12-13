import express from 'express';
import {createData, deleteData, getData, updateData, getDataDetail, updateStatus }  from '../controllers/dataController.js';



const dataRouter = express.Router();


dataRouter.route('/').get(getData);
dataRouter.route('/create').post(createData);
dataRouter.route('/details/:id').get(getDataDetail);
dataRouter.route('/update/:id').post(updateData);
dataRouter.route('/delete/:id').get(deleteData);
dataRouter.route('/status/:id').post(updateStatus);

 

export default dataRouter;
 