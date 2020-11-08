import Join from '../infra/typeorm/entities/Join';
import ICreateJoinDTO from '../dtos/ICreateJoinDTO';

interface IJoinsRepository {
    create(data: ICreateJoinDTO): Promise<Join>;
}

export default IJoinsRepository;
