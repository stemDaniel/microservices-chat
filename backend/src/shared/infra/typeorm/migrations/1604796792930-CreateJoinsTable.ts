import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class CreateJoinsTable1604796792930
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'joins',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'room_id',
                        type: 'uuid',
                    },
                    {
                        name: 'is_moderator',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'joins',
            new TableForeignKey({
                name: 'UserID',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'joins',
            new TableForeignKey({
                name: 'RoomID',
                columnNames: ['room_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'rooms',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('joins', 'RoomID');

        await queryRunner.dropForeignKey('joins', 'UserID');

        await queryRunner.dropTable('joins');
    }
}
