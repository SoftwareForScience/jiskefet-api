import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovedDefaultDatesAndTypes1539015114158 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `epn_role_session` CHANGE `session_start` `session_start` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `epn_role_session` CHANGE `session_end` `session_end` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `detector_quality_history` CHANGE `change_time` `change_time` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `run_quality_history` DROP COLUMN `change_time`");
        await queryRunner.query("ALTER TABLE `run_quality_history` ADD `change_time` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `run` DROP COLUMN `time_o2_start`");
        await queryRunner.query("ALTER TABLE `run` ADD `time_o2_start` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `run` DROP COLUMN `time_trg_start`");
        await queryRunner.query("ALTER TABLE `run` ADD `time_trg_start` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `run` DROP COLUMN `time_trg_end`");
        await queryRunner.query("ALTER TABLE `run` ADD `time_trg_end` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `run` DROP COLUMN `time_o2_end`");
        await queryRunner.query("ALTER TABLE `run` ADD `time_o2_end` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `run_eor_history` DROP COLUMN `change_time`");
        await queryRunner.query("ALTER TABLE `run_eor_history` ADD `change_time` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `token_valid_until`");
        await queryRunner.query("ALTER TABLE `user` ADD `token_valid_until` datetime NULL");
        await queryRunner.query("ALTER TABLE `log` CHANGE `creation_time` `creation_time` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `log` CHANGE `announcement_valid_until` `announcement_valid_until` datetime NULL");
        await queryRunner.query("ALTER TABLE `attachment` CHANGE `creation_time` `creation_time` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `intervention_log` CHANGE `time_of_call` `time_of_call` timestamp NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `intervention_log` CHANGE `time_of_call` `time_of_call` timestamp(0) NULL");
        await queryRunner.query("ALTER TABLE `attachment` CHANGE `creation_time` `creation_time` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `log` CHANGE `announcement_valid_until` `announcement_valid_until` datetime(0) NULL");
        await queryRunner.query("ALTER TABLE `log` CHANGE `creation_time` `creation_time` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `token_valid_until`");
        await queryRunner.query("ALTER TABLE `user` ADD `token_valid_until` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `run_eor_history` DROP COLUMN `change_time`");
        await queryRunner.query("ALTER TABLE `run_eor_history` ADD `change_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `run` DROP COLUMN `time_o2_end`");
        await queryRunner.query("ALTER TABLE `run` ADD `time_o2_end` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `run` DROP COLUMN `time_trg_end`");
        await queryRunner.query("ALTER TABLE `run` ADD `time_trg_end` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `run` DROP COLUMN `time_trg_start`");
        await queryRunner.query("ALTER TABLE `run` ADD `time_trg_start` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `run` DROP COLUMN `time_o2_start`");
        await queryRunner.query("ALTER TABLE `run` ADD `time_o2_start` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `run_quality_history` DROP COLUMN `change_time`");
        await queryRunner.query("ALTER TABLE `run_quality_history` ADD `change_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `detector_quality_history` CHANGE `change_time` `change_time` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `epn_role_session` CHANGE `session_end` `session_end` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `epn_role_session` CHANGE `session_start` `session_start` datetime(0) NOT NULL");
    }

}
