import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ClientError from '@shared/errors/ClientError';
import ICreateRoomDTO from '../dtos/ICreateRoomDTO';
import Room from '../infra/typeorm/entities/Room';
import IRoomsRepository from '../repositories/IRoomsRepository';

@injectable()
class CreateRoomService {
    constructor(
        @inject('RoomsRepository')
        private roomsRepository: IRoomsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        moderator_user_id,
        name,
    }: ICreateRoomDTO): Promise<Room> {
        const verifyIfModeratorExists = await this.usersRepository.findUserByID(
            moderator_user_id,
        );

        if (!verifyIfModeratorExists) {
            throw new ClientError(
                'Its not possible to create a room with a moderator that does not exists!',
            );
        }

        const room = await this.roomsRepository.create({
            moderator_user_id,
            name,
        });

        return room;
    }
}

export default CreateRoomService;
