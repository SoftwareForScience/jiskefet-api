import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialCreateSchema1539095419272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // tslint:disable-next-line:max-line-length
        await queryRunner.query('INSERT INTO `run` (`run_number`, `o2_start_time`, `trg_start_time`, `activity_id`, `run_type`, `n_detectors`, `n_flps`, `n_epns`) VALUES (1, \'2018-12-11 21:42:52\', \'2018-12-11 21:42:52\', \'Sl4e12ofb83no92ns\', \'TECHNICAL\', 2, 7, 8);');
        await queryRunner.query('INSERT INTO `user` (`user_id`, `external_id`, `sams_id`) VALUES (1, 1, 1);');
        // tslint:disable-next-line:max-line-length
        await queryRunner.query('INSERT INTO `log` (`log_id`, `subtype`, `origin`, `creation_time`, `title`, `body`, `fk_user_id`) VALUES (1, \'comment\', \'process\', \'2018-12-11 21:42:52\', \'inserted by populate query\', \'inserted by populate query\', 1);');
    }

    // tslint:disable-next-line:no-empty
    public async down(queryRunner: QueryRunner): Promise<any> { }
}
