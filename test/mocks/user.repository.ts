import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../src/entities/user.entity';
import { logArray } from './log.repository';

export const userArray: User[] = [
    {
        userId: 1,
        externalUserId: 1,
        samsId: 1,
        logs: logArray,
        userNotifications: null,
        detectorQualityHistories: null,
        reportPreferences: null,
        runEorHistories: null,
        runQualityHistories: null,
        subSystemPermissions: null,
        userFilters: null
    },
    {
        userId: 2,
        externalUserId: 2,
        samsId: 2,
        logs: logArray,
        userNotifications: null,
        detectorQualityHistories: null,
        reportPreferences: null,
        runEorHistories: null,
        runQualityHistories: null,
        subSystemPermissions: null,
        userFilters: null
    }
];

@EntityRepository(User)
export class UserRepository extends Repository<User> {

}
