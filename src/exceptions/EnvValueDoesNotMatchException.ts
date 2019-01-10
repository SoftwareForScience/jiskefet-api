/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/*
 * Environment value does not match the expected value
 */
export default class EnvValueDoesNotMatchException extends Error {
    readonly message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }
}
