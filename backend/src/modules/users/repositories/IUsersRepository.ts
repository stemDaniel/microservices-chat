import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User>;
    findUserByNickname(nickname: string): Promise<User | undefined>;
    findUserByID(user_id: string): Promise<User | undefined>;
}

export default IUsersRepository;
