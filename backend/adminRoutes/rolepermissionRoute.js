import express from 'express';
import {getRolePermission } from '../controllers/roleController.js';




const rolepermissionRouter = express.Router();


rolepermissionRouter.route('/:role_id').get(getRolePermission);

 

export default rolepermissionRouter;
 