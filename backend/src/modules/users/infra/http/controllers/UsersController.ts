import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '../../../services/CreateUserService';

class UsersController {
    public async create(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { nickname, password } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            nickname,
            password,
        });

        return response.json(classToClass(user));
    }
}

export default UsersController;
