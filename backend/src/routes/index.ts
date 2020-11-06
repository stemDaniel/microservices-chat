import { Router } from 'express';

const routes = Router();

routes.post('/route', (req, res) => {
    return res.json({ message: 'Hello, World!' });
});

export default routes;
