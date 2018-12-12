import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialCreateSchema1539095419272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // tslint:disable-next-line:max-line-length
        await queryRunner.query('INSERT INTO `run` (`run_number`, `time_o2_start`, `time_trg_start`, `time_trg_end`, `time_o2_end`, `activity_id`, `run_type`, `run_quality`, `n_detectors`, `n_flps`, `n_epns`, `n_timeframes`, `n_subtimeframes`, `bytes_read_out`, `bytes_timeframe_builder`) VALUES(1, \'2018-12-11 21:42:52\', \'2018-12-11 21:42:52\', \'2018-12-11 21:42:52\', \'2018-12-11 21:42:52\', \'Sl4e12ofb83no92ns\', \'test\', \'test\', 16, 7, 8, 2, 4, 5, 12);');
        await queryRunner.query('INSERT INTO `user` (`user_id`, `external_id`, `sams_id`) VALUES (1, 1, 1);');
    }

    // tslint:disable-next-line:no-empty
    public async down(queryRunner: QueryRunner): Promise<any> { }
}
