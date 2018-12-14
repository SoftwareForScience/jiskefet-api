/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/*
 * Failed persisting InfoLogs from infolog-data directory.
 */
export default class InvalidSettingException extends Error {
    readonly message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }
}
