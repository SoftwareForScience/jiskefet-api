import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedPrecision1539018253309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `intervention_log` DROP COLUMN `time_of_call`");
        await queryRunner.query("ALTER TABLE `intervention_log` ADD `time_of_call` datetime(0) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `intervention_log` DROP COLUMN `time_of_call`");
        await queryRunner.query("ALTER TABLE `intervention_log` ADD `time_of_call` timestamp(0) NULL");
    }

}
