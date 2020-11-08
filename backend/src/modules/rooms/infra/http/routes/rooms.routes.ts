import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import checkAuth from '@shared/infra/http/middlewares/checkAuth';
import RoomsController from '../controllers/RoomsController';

const roomsRoutes = Router();

const roomsController = new RoomsController();

roomsRoutes.get('/', roomsController.index);

roomsRoutes.post(
    '/',
    checkAuth,
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
        }),
    }),
    roomsController.create,
);

export default roomsRoutes;
