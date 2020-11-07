import ClientError from '@shared/errors/ClientError';
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateRoomService from '../../../services/CreateRoomService';

class RoomsController {
    public async create(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { name } = request.body;

        const { user } = request;

        if (!user) {
            throw new ClientError(
                'This route should be preceded by the checkAuth middleware!',
            );
        }

        const createRoom = container.resolve(CreateRoomService);

        const room = await createRoom.execute({
            moderator_user_id: user.id,
            name,
        });

        return response.json(room);
    }
}

export default RoomsController;
