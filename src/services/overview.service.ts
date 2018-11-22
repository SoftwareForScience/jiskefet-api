/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubSystem } from 'entities/sub_system.entity';
import { GetOverviewDto } from 'dtos/get.overview.dto';
import * as _ from 'lodash';

@Injectable()
export class OverviewService {
    private readonly subSystemRepository: Repository<SubSystem>;

    constructor(
        @InjectRepository(SubSystem) subSystemRepository: Repository<SubSystem>
    ) {
        this.subSystemRepository = subSystemRepository;
    }

    /**
     * Returns all Overviews from the db.
     */
    async find(): Promise<GetOverviewDto[]> {
        const result = await this.subSystemRepository.query(
            `SELECT ss.subsystem_name, COUNT(*) as logs, u.user_id, ll.last_log, ll.log_id
        FROM sub_system ss
        INNER JOIN (
          SELECT log_id, fk_user_id, subsystem_fk_subsystem_id, MAX(creation_time), creation_time, title as last_log
          FROM log GROUP BY log_id
        ) ll
        ON ll.subsystem_fk_subsystem_id = ss.subsystem_id
        LEFT JOIN user u
        ON u.user_id = ll.fk_user_id
        WHERE ll.creation_time > (NOW() - INTERVAL 24 HOUR)
        GROUP BY ss.subsystem_id;`
        );
        const overview = new Array() as GetOverviewDto[];
        for (const rowDataPacket of result) {
            const subsystem = {} as GetOverviewDto;
            subsystem.subsystemName = rowDataPacket.subsystem_name;
            subsystem.logs = rowDataPacket.logs;
            subsystem.userId = rowDataPacket.user_id;
            subsystem.lastLog = rowDataPacket.last_log;
            subsystem.logId = rowDataPacket.log_id;
            overview.push(subsystem);
        }
        return overview;
    }

}
