import express from 'express';
import {createPermission, deletePermission, getPermissionDetail, updatePermission, getPermission, updateStatus } from '../controllers/permissionController.js';


const permissionRouter = express.Router();


permissionRouter.route('/').get(getPermission);
permissionRouter.route('/create').post(createPermission);
permissionRouter.route('/details/:id').get(getPermissionDetail);
permissionRouter.route('/update/:id').post(updatePermission);
permissionRouter.route('/delete/:id').get(deletePermission);
permissionRouter.route('/status/:id').post(updateStatus);

 

export default permissionRouter;
 