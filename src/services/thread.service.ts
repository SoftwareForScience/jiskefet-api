/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../entities/log.entity';
import { ThreadDto } from '../dtos/thread.dto';
import { CreateCommentDto } from '../dtos/create.comment.dto';
import { plainToClass } from 'class-transformer';
import { Run } from '../entities/run.entity';

@Injectable()
export class ThreadService {

    private readonly logRepository: Repository<Log>;
    private readonly runRepository: Repository<Run>;

    constructor(@InjectRepository(Log) logRepository: Repository <Log>,
                @InjectRepository(Run) runRepository: Repository <Run> ) {
        this.logRepository = logRepository;
        this.runRepository = runRepository;
    }
    /**
     * Creates a Comment on a Run
     * Root Id refers to the Run's Log id
     * Parent Id refers to the comment Log id
     * @param createThreadDto
     */
    async replyToRun(createThreadDto: CreateCommentDto): Promise<ThreadDto> {
        const logEntity = plainToClass(Log, createThreadDto);
        logEntity.commentFkRootLogId = createThreadDto.runId;
        logEntity.commentFkParentLogId = createThreadDto.parentId;
        logEntity.creationTime = new Date();
        logEntity.subtype = 'comment';
        logEntity.origin = 'human';
        logEntity.runs = [];

        const threadTopic = await this.logRepository.findOne(createThreadDto.runId);
        if (!threadTopic) {
            throw new HttpException('There is no log with the given id.', 404);
        }

        if (createThreadDto.runId) {
            const run = await this.runRepository.findOne(createThreadDto.runId);
            if (!run) {
                throw new HttpException('There is no run with the given id.', 404);
            }
            await logEntity.runs.push(run);
        }

        const newThread = (await this.logRepository.save(logEntity)).toThreadDto();
        return newThread;
    }

    /**
     * Find a thread by run id with it's comments
     * @param threadId number
     */
    async findThreadById(runLogId: number): Promise<ThreadDto> {
        const topic = await this.logRepository.findOne({
            where: {
                subtype: 'run',
                logId: runLogId
            }
        });
        if (!topic) {
            throw new HttpException('Couldn\'t find the specifed run with the given log id.', 404);
        }

        const comments = await this.logRepository.find({
            where: {
                commentFkRootLogId: runLogId
            }
        });
        if (comments.length === 0) {
            throw new HttpException('Couldn\'t find comments on this log.', 404);
        }

        const thread = this.createThreadStructure(topic, comments);
        return thread;
    }

    private createThreadStructure(topic: Log, comments: Log[]): ThreadDto {
        let thread = new ThreadDto();
        thread = topic.toThreadDto();
        thread.comments = [];

        comments
            .sort((x, y) => {
                const a = x.creationTime;
                const b = y.creationTime;
                return a > b ? 1 : b > a ? -1 : 0;
            })
            .sort((x, y) => {
                const a = x.commentFkParentLogId;
                const b = y.commentFkParentLogId;
                return a > b ? 1 : b > a ? -1 : 0;
            });

        for (let a = 0; a <= comments.length - 1; a++) {
            const parentComment = comments[a].toThreadDto();
            parentComment.comments = [];
            for (let b = a + 1; b <= comments.length - 1; b++) {
                if (parentComment.logId === comments[b].commentFkParentLogId) {
                    let subComment = new ThreadDto();
                    subComment = comments[b].toThreadDto();
                    parentComment.comments.push(subComment);
                    comments.splice(b, 1);
                    b -= 1;
                }
            }
            thread.comments.push(parentComment);
        }
        return thread;
    }
}
