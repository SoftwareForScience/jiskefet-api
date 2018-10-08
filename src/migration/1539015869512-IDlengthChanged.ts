import {MigrationInterface, QueryRunner} from "typeorm";

export class IDlengthChanged1539015869512 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `epn_role_session` CHANGE `session_start` `session_start` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `epn_role_session` CHANGE `session_end` `session_end` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `detector_quality_history` CHANGE `change_time` `change_time` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `run_quality_history` CHANGE `change_time` `change_time` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `run` CHANGE `time_o2_start` `time_o2_start` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `run` CHANGE `time_trg_start` `time_trg_start` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `run` CHANGE `time_trg_end` `time_trg_end` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `run` CHANGE `time_o2_end` `time_o2_end` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `run` DROP COLUMN `activity_id`");
        await queryRunner.query("ALTER TABLE `run` ADD `activity_id` char(16) NOT NULL");
        await queryRunner.query("ALTER TABLE `run_eor_history` CHANGE `change_time` `change_time` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `token_valid_until` `token_valid_until` datetime NULL");
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
        await queryRunner.query("ALTER TABLE `user` CHANGE `token_valid_until` `token_valid_until` datetime(0) NULL");
        await queryRunner.query("ALTER TABLE `run_eor_history` CHANGE `change_time` `change_time` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `run` DROP COLUMN `activity_id`");
        await queryRunner.query("ALTER TABLE `run` ADD `activity_id` char(64) NOT NULL");
        await queryRunner.query("ALTER TABLE `run` CHANGE `time_o2_end` `time_o2_end` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `run` CHANGE `time_trg_end` `time_trg_end` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `run` CHANGE `time_trg_start` `time_trg_start` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `run` CHANGE `time_o2_start` `time_o2_start` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `run_quality_history` CHANGE `change_time` `change_time` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `detector_quality_history` CHANGE `change_time` `change_time` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `epn_role_session` CHANGE `session_end` `session_end` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `epn_role_session` CHANGE `session_start` `session_start` datetime(0) NOT NULL");
    }

}
