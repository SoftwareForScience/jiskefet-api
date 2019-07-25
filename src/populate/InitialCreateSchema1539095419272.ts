import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialCreateSchema1539095419272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.query("INSERT INTO `user` (`user_id`, `external_id`, `sams_id`, `name`) VALUES (1,1,1,'Anonymous')");

    }

    // tslint:disable-next-line:no-empty
    public async down(queryRunner: QueryRunner): Promise<any> { }
}
