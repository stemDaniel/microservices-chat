import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersController from '../controllers/UsersController';

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            nickname: Joi.string().required(),
            password: Joi.string().required(),
        }),
    }),
    usersController.create,
);

export default usersRoutes;
