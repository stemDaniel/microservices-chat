import Join from '../infra/typeorm/entities/Join';
import ICreateJoinDTO from '../dtos/ICreateJoinDTO';
import IFindJoinByUserAndRoomDTO from '../dtos/IFindJoinByUserAndRoomDTO';

interface IJoinsRepository {
    create(data: ICreateJoinDTO): Promise<Join>;
    findJoinByUserIDAndRoomID(
        data: IFindJoinByUserAndRoomDTO,
    ): Promise<Join | undefined>;
    delete(join_id: string): Promise<void>;
}

export default IJoinsRepository;
