import express from 'express';
import {createRoles, deleteRoles, getRolesDetail, updateRoles, getRoles, updateStatus } from '../controllers/roleController.js';




const rolesRouter = express.Router();


rolesRouter.route('/').get(getRoles);
rolesRouter.route('/create').post(createRoles);
rolesRouter.route('/details/:id').get(getRolesDetail);
rolesRouter.route('/update/:id').post(updateRoles);
rolesRouter.route('/delete/:id').get(deleteRoles);
rolesRouter.route('/status/:id').post(updateStatus);

 

export default rolesRouter;
 