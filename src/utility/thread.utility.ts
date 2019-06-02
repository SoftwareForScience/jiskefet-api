/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

import { Log } from '../entities/log.entity';
import { ThreadDto } from '../dtos/thread.dto';

export class ThreadUtility {
    /**
     * Creates the thread hierarchy
     * @param rootLog The root Log with subtype 'run' which is also the topic of the thread
     * @param comments The Logs which are comments on the topic
     */
    public async createThreadStructure(rootLog: Log, comments: Log[]): Promise<ThreadDto> {
        let thread = new ThreadDto();
        thread = rootLog.toThreadDto();
        thread.comments = [];
        // pre-sort the comments to make the building of thread structure faster.
        comments
            .sort((x, y) => {
                const a = x.creationTime;
                const b = y.creationTime;
                return a > b ? 1 : b > a ? -1 : 0;
            });

        thread = this.addComments(comments, thread.logId, thread);
        return thread;
    }

    /**
     * Recursively adds comments to the right posistion of the thread.
     * @param comments all comments in the thread
     * @param parentId the parentId of the comment
     * @param thread return a threadDto
     */
    private addComments(comments: Log[], parentId: number, thread: ThreadDto): any {
        // tslint:disable-next-line:prefer-for-of
        for (let a = 0; a < comments.length; a++) {
            if (comments[a].commentFkParentLogId === parentId) {
                const subComment = comments[a].toThreadDto();
                subComment.comments = [];
                thread.comments.push(subComment);
                comments.splice(a, 1);
                a--;
                this.addComments(comments, subComment.logId, subComment);
            }
        }
        return thread;
    }
}
