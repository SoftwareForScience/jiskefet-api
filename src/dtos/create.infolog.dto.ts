/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

export class CreateInfologDto {
    severity: string;
    level: number;
    timestamp: number;
    hostname: string;
    rolename?: string;
    pid: number;
    username?: string;
    system?: string;
    facility?: string;
    detector?: string;
    partition?: string;
    run?: number;
    errcode?: number;
    errline?: number;
    errsource?: string;
    message: string;
}
