import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import roomsRoutes from '@modules/rooms/infra/http/routes/rooms.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/users', sessionsRoutes);
routes.use('/rooms', roomsRoutes);

export default routes;
