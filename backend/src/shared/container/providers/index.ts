import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IUsersRepository>(
    'IUsersRepository',
    UsersRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
