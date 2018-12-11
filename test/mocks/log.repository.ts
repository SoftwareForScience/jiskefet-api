import { EntityRepository } from 'typeorm';
import { Log } from '../../src/entities/log.entity';
import { userArray } from './user.repository';
import { CreateLogDto } from '../../src/dtos/create.log.dto';
import { plainToClass } from 'class-transformer';
import { LinkRunToLogDto } from '../../src/dtos/linkRunToLog.log.dto';

export const logArray: Log[] = [
    {
        logId: 1,
        subtype: 'run',
        origin: 'human',
        creationTime: new Date('2018-12-29T23:59:59Z'),
        title: 'mock title 1',
        text: 'mock text 1',
        subsystemFkSubsystemId: 1,
        announcementValidUntil: new Date('2018-12-31T23:59:59Z'),
        attachments: null,
        commentFkParentLogId: null,
        commentFkRootLogId: null,
        runs: null,
        tags: null,
        user: userArray[0]
    },
    {
        logId: 2,
        subtype: 'run',
        origin: 'human',
        creationTime: new Date('2018-12-30T23:59:59Z'),
        title: 'mock title 2',
        text: 'mock text 2',
        subsystemFkSubsystemId: 2,
        announcementValidUntil: new Date('2018-12-31T23:59:59Z'),
        attachments: null,
        commentFkParentLogId: null,
        commentFkRootLogId: null,
        runs: null,
        tags: null,
        user: userArray[0]
    }
];

/**
 * This class mocks the function calls from the LogService
 */
@EntityRepository(Log)
export class LogRepository {

    /**
     * Saves a Log entity in db by converting the given CreateLogDto to a Log.
     * @param createLogDto class that carries the request body for a Log.
     */
    async create(createLogDto: CreateLogDto): Promise<Log> {
        const LogEntity = plainToClass(Log, createLogDto);
        LogEntity.creationTime = new Date();
        if (LogEntity.attachments) {
            for (const attachment of LogEntity.attachments) {
                attachment.creationTime = LogEntity.creationTime;
            }
        }
        return LogEntity;
    }

    /**
     * Returns a Log by id from the db.
     * @param runId unique identifier for a Log.
     */
    async findLogById(runId: number): Promise<Log> {
        return await logArray.find(result => result.logId === runId);
    }

    /**
     * Returns all Logs from the db.
     */
    async findAll(): Promise<{ logs: Log[], count: number }> {
        return await {
            logs: logArray,
            count: logArray.length
        };
    }

    /**
     * Returns logs from a specific user
     * @param userId number
     */
    async findLogsByUserId(userId: number): Promise<{ data: Log[], count: number }> {
        const logs = logArray.filter(result => result.user.userId === userId);
        return await {
            data: logs,
            count: logs.length
        };
    }

    // /**
    //  * Link a run to a log.
    //  * @param linkRunToLogDto
    //  */
    // async linkRunToLog(logId: number, linkRunToLogDto: LinkRunToLogDto): Promise<void> {
    //     const log = await this.findLogById(logId);
    //     const run = await this.runRepository.findOne(linkRunToLogDto.runNumber);
    //     log.runs = [...log.runs, run];
    //     await this.repository.save(log);
    // }
}
