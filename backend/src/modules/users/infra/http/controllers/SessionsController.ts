import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '../../../services/AuthenticateUserService';

class SessionsController {
    public async create(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { nickname, password } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);

        const { token, user } = await authenticateUser.execute({
            nickname,
            password,
        });

        return response.json({
            token,
            user: classToClass(user),
        });
    }
}

export default SessionsController;
