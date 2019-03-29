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
import { Log } from '../entities/log.entity';
import { ThreadDto } from '../dtos/thread.dto';
import _ from 'underscore';

@Injectable()
export class ThreadService {

    private readonly repository: Repository<Log>;

    constructor(@InjectRepository(Log) repository: Repository<Log>) {
        this.repository = repository;
    }

    /**
     * Find a thread by id with it's comments
     * @param threadId number
     */
    async findThreadById(threadId: number): Promise<ThreadDto> {
        const logs = await this.repository.find({
            where: {
                commentFkRootLogId: threadId
            }
        });

        const thread = this.determaniteThreadHierarchy(logs);

        return thread;
    }

    /**
     * Determanates a thread based on a log entity
     * @param logs
     */
    private determaniteThreadHierarchy(logs: Log[]): ThreadDto {
        const listOfComments = new Array<ThreadDto>();
        const rootLog = logs.filter(x => x.commentFkRootLogId === x.commentFkParentLogId)[0];
        const parentThread = this.mapLogToThreadDto(rootLog);
        const parentLogs = logs.filter(x => x.commentFkRootLogId !== x.commentFkParentLogId)
                                .sort((x, y) => {
                                    const a = x.commentFkParentLogId;
                                    const b = y.commentFkParentLogId;
                                    return a > b ? 1 : b > a ? -1 : 0;
                                });

        for (let index = 0; index < parentLogs.length; index++) {
            let list = new Array<ThreadDto>();
            const comment = this.mapLogToThreadDto(parentLogs[index]);
            let nextParentId = 0;
            if (index !== parentLogs.length - 1) {
                nextParentId = parentLogs[index + 1].commentFkParentLogId;
            }

            if (index + 1 < parentLogs.length && nextParentId === comment.parentId) {
                for (let subIndex = index + 1; subIndex < parentLogs.length; subIndex++) {
                    const subComment = this.mapLogToThreadDto(parentLogs[subIndex]);
                    if (subComment.parentId === comment.parentId) {
                        list.push(subComment);
                        index = subIndex;
                    }
                }
                comment.comments = list;
            } else {
                list = new Array<ThreadDto>();
            }
            listOfComments.push(comment);
        }
        parentThread.comments = listOfComments;

        return parentThread;
    }

    /**
     * Maps a Log entity to a ThreadDto object
     * @param log
     */
    private mapLogToThreadDto(log: Log): ThreadDto {
        const thread = new ThreadDto();
        thread.title = log.title;
        thread.description = log.text;
        thread.createdAt = log.creationTime;
        thread.parentId = log.commentFkParentLogId;
        thread.rootId = log.commentFkRootLogId;

        return thread;
    }
}
