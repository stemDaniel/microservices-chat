import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User>;
}

export default IUsersRepository;
