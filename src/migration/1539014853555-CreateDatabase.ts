import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1539014853555 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `tag` (`tag_id` int NOT NULL AUTO_INCREMENT, `tag_text` varchar(255) NOT NULL, PRIMARY KEY (`tag_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_notification` (`notify_sor` tinyint NOT NULL, `notify_eor` tinyint NOT NULL, `notify_subsystem` tinyint NOT NULL, `fk_user_id` int NOT NULL, PRIMARY KEY (`fk_user_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `report_preference` (`report_stuff_etc` varchar(255) NOT NULL, `fk_user_id` int NOT NULL, PRIMARY KEY (`fk_user_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_filter` (`filter_id` int NOT NULL AUTO_INCREMENT, `fk_user_id` int NOT NULL, PRIMARY KEY (`filter_id`, `fk_user_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `epn_role_session` (`session_number` int NOT NULL AUTO_INCREMENT, `epn_role_name` char(16) NOT NULL, `epn_hostname` varchar(255) NOT NULL, `n_subtimeframes` int NOT NULL, `bytes_in` int NOT NULL, `bytes_out` int NOT NULL, `session_start` datetime NOT NULL, `session_end` datetime NOT NULL, `fk_run_number` int NOT NULL, PRIMARY KEY (`session_number`, `epn_role_name`, `fk_run_number`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `flp_role` (`flp_role_name` char(16) NOT NULL, `flp_hostname` varchar(255) NOT NULL, `n_timeframes` int NOT NULL, `bytes_processed` int NOT NULL, `fk_run_number` int NOT NULL, PRIMARY KEY (`flp_role_name`, `fk_run_number`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `detector_quality_history` (`detector_quality_history_id` int NOT NULL AUTO_INCREMENT, `change_time` datetime NOT NULL, `run_quality` enum ('test') NOT NULL, `fk_run_number` int NOT NULL, `fk_detector_id` int NOT NULL, `fk_changed_by_user_id` int NOT NULL, PRIMARY KEY (`detector_quality_history_id`, `fk_run_number`, `fk_detector_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `detector` (`detector_id` int NOT NULL AUTO_INCREMENT, `detector_name` varchar(255) NOT NULL, PRIMARY KEY (`detector_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `detectors_in_run` (`run_quality` enum ('test') NOT NULL, `fk_run_number` int NOT NULL, `fk_detector_id` int NOT NULL, PRIMARY KEY (`fk_run_number`, `fk_detector_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `run_quality_history` (`run_quality_history_id` int NOT NULL AUTO_INCREMENT, `change_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `runQuality` enum ('test') NOT NULL, `fk_run_number` int NOT NULL, `fk_changed_by_user_id` int NOT NULL, PRIMARY KEY (`run_quality_history_id`, `fk_run_number`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `run` (`run_number` int NOT NULL AUTO_INCREMENT, `time_o2_start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `time_trg_start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `time_trg_end` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `time_o2_end` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `activity_id` char(64) NOT NULL, `run_type` enum ('test') NOT NULL, `run_quality` enum ('test') NOT NULL, `n_detectors` int NOT NULL, `n_flps` int NOT NULL, `n_epns` int NOT NULL, `n_timeframes` int NOT NULL, `n_subtimeframes` int NOT NULL, `bytes_read_out` int NOT NULL, `bytes_timeframe_builder` int NOT NULL, PRIMARY KEY (`run_number`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `run_eor_history` (`eor_history_id` int NOT NULL AUTO_INCREMENT, `subsystem` enum ('test') NOT NULL, `change_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `end_of_run_reason` enum ('test') NOT NULL, `fk_run_number` int NOT NULL, `fk_changed_by_user_id` int NOT NULL, PRIMARY KEY (`eor_history_id`, `subsystem`, `fk_run_number`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sub_system` (`subsystem_id` int NOT NULL AUTO_INCREMENT, `subsystem_name` varchar(255) NOT NULL, PRIMARY KEY (`subsystem_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sub_system_permission` (`is_member` tinyint NOT NULL, `edit_eor_reason` tinyint NOT NULL, `fk_user_id` int NOT NULL, `fk_subsystem_id` int NOT NULL, PRIMARY KEY (`fk_user_id`, `fk_subsystem_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`user_id` int NOT NULL AUTO_INCREMENT, `sams_id` int NOT NULL, `token` varchar(255) NULL, `token_valid_until` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`user_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `log` (`log_id` int NOT NULL AUTO_INCREMENT, `subtype` enum ('run', 'subsystem', 'announcement', 'intervention', 'comment') NOT NULL, `origin` enum ('human', 'process') NOT NULL, `creation_time` datetime NOT NULL, `title` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, `subsystem_fk_subsystem_id` int NULL, `announcement_valid_until` datetime NULL, `comment_fk_parent_log_id` int NULL, `comment_fk_root_log_id` int NULL, `fk_user_id` int NULL, PRIMARY KEY (`log_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `attachment` (`file_id` int NOT NULL AUTO_INCREMENT, `creation_time` datetime NOT NULL, `title` varchar(255) NOT NULL, `file_mime` varchar(255) NOT NULL, `file_data` blob NOT NULL, `file_md5` char(16) NULL, `fk_log_id` int NOT NULL, PRIMARY KEY (`file_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `intervention_log` (`time_of_call` timestamp NULL, `intervention_type` enum ('test') NULL, `location` enum ('test') NULL, `action_taken` varchar(255) NULL, `log_id` int NOT NULL, UNIQUE INDEX `REL_e90cb19497046349b04ffd752c` (`log_id`), PRIMARY KEY (`log_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tags_in_run` (`fk_run_id` int NOT NULL, `fk_tag_id` int NOT NULL, PRIMARY KEY (`fk_run_id`, `fk_tag_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tags_in_log` (`fk_log_id` int NOT NULL, `fk_tag_id` int NOT NULL, PRIMARY KEY (`fk_log_id`, `fk_tag_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `runs_in_log` (`fk_log_id` int NOT NULL, `fk_run_number` int NOT NULL, PRIMARY KEY (`fk_log_id`, `fk_run_number`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user_notification` ADD CONSTRAINT `FK_41c7ddc7acdf49603c33e3caf14` FOREIGN KEY (`fk_user_id`) REFERENCES `user`(`user_id`)");
        await queryRunner.query("ALTER TABLE `report_preference` ADD CONSTRAINT `FK_1291f985da730107596126da578` FOREIGN KEY (`fk_user_id`) REFERENCES `user`(`user_id`)");
        await queryRunner.query("ALTER TABLE `user_filter` ADD CONSTRAINT `FK_cfac35d9cceb538dc2471867c04` FOREIGN KEY (`fk_user_id`) REFERENCES `user`(`user_id`)");
        await queryRunner.query("ALTER TABLE `epn_role_session` ADD CONSTRAINT `FK_f3a0f0e5ed47115ebca043c1be6` FOREIGN KEY (`fk_run_number`) REFERENCES `run`(`run_number`)");
        await queryRunner.query("ALTER TABLE `flp_role` ADD CONSTRAINT `FK_999932d86caf41973b4145f424a` FOREIGN KEY (`fk_run_number`) REFERENCES `run`(`run_number`)");
        await queryRunner.query("ALTER TABLE `detector_quality_history` ADD CONSTRAINT `FK_ebef7901e7a095c6f3caa2c51c4` FOREIGN KEY (`fk_run_number`) REFERENCES `run`(`run_number`)");
        await queryRunner.query("ALTER TABLE `detector_quality_history` ADD CONSTRAINT `FK_93806078349c4081f320e63a210` FOREIGN KEY (`fk_detector_id`) REFERENCES `detector`(`detector_id`)");
        await queryRunner.query("ALTER TABLE `detector_quality_history` ADD CONSTRAINT `FK_a1d6eb9816c5cb15c6c06137657` FOREIGN KEY (`fk_changed_by_user_id`) REFERENCES `user`(`user_id`)");
        await queryRunner.query("ALTER TABLE `detectors_in_run` ADD CONSTRAINT `FK_b15c73e655848361f761012dad2` FOREIGN KEY (`fk_run_number`) REFERENCES `run`(`run_number`)");
        await queryRunner.query("ALTER TABLE `detectors_in_run` ADD CONSTRAINT `FK_6a0617d5d9c1621db4eaf5ede34` FOREIGN KEY (`fk_detector_id`) REFERENCES `detector`(`detector_id`)");
        await queryRunner.query("ALTER TABLE `run_quality_history` ADD CONSTRAINT `FK_616429fb61e94e4fac482bab047` FOREIGN KEY (`fk_run_number`) REFERENCES `run`(`run_number`)");
        await queryRunner.query("ALTER TABLE `run_quality_history` ADD CONSTRAINT `FK_935856663e0c7d8c2c79d9bd37a` FOREIGN KEY (`fk_changed_by_user_id`) REFERENCES `user`(`user_id`)");
        await queryRunner.query("ALTER TABLE `run_eor_history` ADD CONSTRAINT `FK_b9ba7beabd195b755a93db9fc2d` FOREIGN KEY (`fk_run_number`) REFERENCES `run`(`run_number`)");
        await queryRunner.query("ALTER TABLE `run_eor_history` ADD CONSTRAINT `FK_5139f84226813f6cf11f464d08d` FOREIGN KEY (`fk_changed_by_user_id`) REFERENCES `user`(`user_id`)");
        await queryRunner.query("ALTER TABLE `sub_system_permission` ADD CONSTRAINT `FK_6b262b7a4bf3c6e1430acd47fc9` FOREIGN KEY (`fk_user_id`) REFERENCES `user`(`user_id`)");
        await queryRunner.query("ALTER TABLE `sub_system_permission` ADD CONSTRAINT `FK_3de32e3bc1693cfebe2fbda9cef` FOREIGN KEY (`fk_subsystem_id`) REFERENCES `sub_system`(`subsystem_id`)");
        await queryRunner.query("ALTER TABLE `log` ADD CONSTRAINT `FK_8eed227a79631e6e439a7260cf8` FOREIGN KEY (`fk_user_id`) REFERENCES `user`(`user_id`)");
        await queryRunner.query("ALTER TABLE `attachment` ADD CONSTRAINT `FK_4987aacc4a45f535e5293591b85` FOREIGN KEY (`fk_log_id`) REFERENCES `log`(`log_id`)");
        await queryRunner.query("ALTER TABLE `intervention_log` ADD CONSTRAINT `FK_e90cb19497046349b04ffd752cc` FOREIGN KEY (`log_id`) REFERENCES `log`(`log_id`)");
        await queryRunner.query("ALTER TABLE `tags_in_run` ADD CONSTRAINT `FK_fe0dcae5a81e6da2fbcad697d72` FOREIGN KEY (`fk_run_id`) REFERENCES `run`(`run_number`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `tags_in_run` ADD CONSTRAINT `FK_9eea2a64f6216cd27f44db3ecb7` FOREIGN KEY (`fk_tag_id`) REFERENCES `tag`(`tag_id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `tags_in_log` ADD CONSTRAINT `FK_d828c3ce745e02708066d45e879` FOREIGN KEY (`fk_log_id`) REFERENCES `log`(`log_id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `tags_in_log` ADD CONSTRAINT `FK_d7e79e3c1d357ef06cb6c76475e` FOREIGN KEY (`fk_tag_id`) REFERENCES `tag`(`tag_id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `runs_in_log` ADD CONSTRAINT `FK_be55c390ca8635a3b9dd9260c94` FOREIGN KEY (`fk_log_id`) REFERENCES `log`(`log_id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `runs_in_log` ADD CONSTRAINT `FK_2995c0c47c4a8759e48fed93d83` FOREIGN KEY (`fk_run_number`) REFERENCES `run`(`run_number`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `runs_in_log` DROP FOREIGN KEY `FK_2995c0c47c4a8759e48fed93d83`");
        await queryRunner.query("ALTER TABLE `runs_in_log` DROP FOREIGN KEY `FK_be55c390ca8635a3b9dd9260c94`");
        await queryRunner.query("ALTER TABLE `tags_in_log` DROP FOREIGN KEY `FK_d7e79e3c1d357ef06cb6c76475e`");
        await queryRunner.query("ALTER TABLE `tags_in_log` DROP FOREIGN KEY `FK_d828c3ce745e02708066d45e879`");
        await queryRunner.query("ALTER TABLE `tags_in_run` DROP FOREIGN KEY `FK_9eea2a64f6216cd27f44db3ecb7`");
        await queryRunner.query("ALTER TABLE `tags_in_run` DROP FOREIGN KEY `FK_fe0dcae5a81e6da2fbcad697d72`");
        await queryRunner.query("ALTER TABLE `intervention_log` DROP FOREIGN KEY `FK_e90cb19497046349b04ffd752cc`");
        await queryRunner.query("ALTER TABLE `attachment` DROP FOREIGN KEY `FK_4987aacc4a45f535e5293591b85`");
        await queryRunner.query("ALTER TABLE `log` DROP FOREIGN KEY `FK_8eed227a79631e6e439a7260cf8`");
        await queryRunner.query("ALTER TABLE `sub_system_permission` DROP FOREIGN KEY `FK_3de32e3bc1693cfebe2fbda9cef`");
        await queryRunner.query("ALTER TABLE `sub_system_permission` DROP FOREIGN KEY `FK_6b262b7a4bf3c6e1430acd47fc9`");
        await queryRunner.query("ALTER TABLE `run_eor_history` DROP FOREIGN KEY `FK_5139f84226813f6cf11f464d08d`");
        await queryRunner.query("ALTER TABLE `run_eor_history` DROP FOREIGN KEY `FK_b9ba7beabd195b755a93db9fc2d`");
        await queryRunner.query("ALTER TABLE `run_quality_history` DROP FOREIGN KEY `FK_935856663e0c7d8c2c79d9bd37a`");
        await queryRunner.query("ALTER TABLE `run_quality_history` DROP FOREIGN KEY `FK_616429fb61e94e4fac482bab047`");
        await queryRunner.query("ALTER TABLE `detectors_in_run` DROP FOREIGN KEY `FK_6a0617d5d9c1621db4eaf5ede34`");
        await queryRunner.query("ALTER TABLE `detectors_in_run` DROP FOREIGN KEY `FK_b15c73e655848361f761012dad2`");
        await queryRunner.query("ALTER TABLE `detector_quality_history` DROP FOREIGN KEY `FK_a1d6eb9816c5cb15c6c06137657`");
        await queryRunner.query("ALTER TABLE `detector_quality_history` DROP FOREIGN KEY `FK_93806078349c4081f320e63a210`");
        await queryRunner.query("ALTER TABLE `detector_quality_history` DROP FOREIGN KEY `FK_ebef7901e7a095c6f3caa2c51c4`");
        await queryRunner.query("ALTER TABLE `flp_role` DROP FOREIGN KEY `FK_999932d86caf41973b4145f424a`");
        await queryRunner.query("ALTER TABLE `epn_role_session` DROP FOREIGN KEY `FK_f3a0f0e5ed47115ebca043c1be6`");
        await queryRunner.query("ALTER TABLE `user_filter` DROP FOREIGN KEY `FK_cfac35d9cceb538dc2471867c04`");
        await queryRunner.query("ALTER TABLE `report_preference` DROP FOREIGN KEY `FK_1291f985da730107596126da578`");
        await queryRunner.query("ALTER TABLE `user_notification` DROP FOREIGN KEY `FK_41c7ddc7acdf49603c33e3caf14`");
        await queryRunner.query("DROP TABLE `runs_in_log`");
        await queryRunner.query("DROP TABLE `tags_in_log`");
        await queryRunner.query("DROP TABLE `tags_in_run`");
        await queryRunner.query("DROP INDEX `REL_e90cb19497046349b04ffd752c` ON `intervention_log`");
        await queryRunner.query("DROP TABLE `intervention_log`");
        await queryRunner.query("DROP TABLE `attachment`");
        await queryRunner.query("DROP TABLE `log`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `sub_system_permission`");
        await queryRunner.query("DROP TABLE `sub_system`");
        await queryRunner.query("DROP TABLE `run_eor_history`");
        await queryRunner.query("DROP TABLE `run`");
        await queryRunner.query("DROP TABLE `run_quality_history`");
        await queryRunner.query("DROP TABLE `detectors_in_run`");
        await queryRunner.query("DROP TABLE `detector`");
        await queryRunner.query("DROP TABLE `detector_quality_history`");
        await queryRunner.query("DROP TABLE `flp_role`");
        await queryRunner.query("DROP TABLE `epn_role_session`");
        await queryRunner.query("DROP TABLE `user_filter`");
        await queryRunner.query("DROP TABLE `report_preference`");
        await queryRunner.query("DROP TABLE `user_notification`");
        await queryRunner.query("DROP TABLE `tag`");
    }

}
