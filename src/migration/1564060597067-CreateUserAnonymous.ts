import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserAnonymous1564060597067 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("INSERT INTO `user` (`user_id`, `external_id`, `sams_id`, `name`) VALUES (1,1,1,'Anonymous')");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
