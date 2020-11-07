import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IRoomsRepository from '@modules/rooms/repositories/IRoomsRepository';
import RoomsRepository from '@modules/rooms/infra/typeorm/repositories/RoomsRepository';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IRoomsRepository>(
    'RoomsRepository',
    RoomsRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
