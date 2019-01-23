/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { EntityRepository } from 'typeorm';
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
export class UserRepository {

}
