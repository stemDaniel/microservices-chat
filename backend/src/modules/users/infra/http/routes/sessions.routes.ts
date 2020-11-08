import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SessionsController from '../controllers/SessionsController';

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

sessionsRoutes.post(
    '/sessions',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            nickname: Joi.string().required(),
            password: Joi.string().required(),
        }),
    }),
    sessionsController.create,
);

export default sessionsRoutes;
