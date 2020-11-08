import { Router } from 'express';

import checkAuth from '@shared/infra/http/middlewares/checkAuth';
import RoomsController from '../controllers/RoomsController';

const roomsRoutes = Router();

const roomsController = new RoomsController();

roomsRoutes.get('/', roomsController.index);
roomsRoutes.post('/', checkAuth, roomsController.create);

export default roomsRoutes;
