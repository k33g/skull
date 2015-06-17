import express from 'express';
import RoleModel from './model';
import checkToken from '../../checking/check-token';
import checkRole from '../../checking/check-role';
import addCrudRoutes from '../../crud-helpers/crud-routes';

let controller = express.Router();

addCrudRoutes(RoleModel, controller)

export default controller;
