/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/*
 * export interface InfoLogProtocols {
 *     [
 *     version: '1.4',
 *     fields: [
 *         { name: 'severity', type: string },
 *         { name: 'level', type: number },
 *         { name: 'timestamp', type: number },
 *         { name: 'hostname', type: string },
 *         { name: 'rolename', type: string },
 *         { name: 'pid', type: number },
 *         { name: 'username', type: string },
 *         { name: 'system', type: string },
 *         { name: 'facility', type: string },
 *         { name: 'detector', type: string },
 *         { name: 'partition', type: string },
 *         { name: 'run', type: number },
 *         { name: 'errcode', type: number },
 *         { name: 'errline', type: number },
 *         { name: 'errsource', type: string },
 *         { name: 'message', type: string }
 *     ],
 *     ];
 * }
 */

module.exports = {
    version: '1.4',
    fields: [
        { name: 'severity', type: String },
        { name: 'level', type: Number },
        { name: 'timestamp', type: Number },
        { name: 'hostname', type: String },
        { name: 'rolename', type: String },
        { name: 'pid', type: Number },
        { name: 'username', type: String },
        { name: 'system', type: String },
        { name: 'facility', type: String },
        { name: 'detector', type: String },
        { name: 'partition', type: String },
        { name: 'run', type: Number },
        { name: 'errcode', type: Number },
        { name: 'errline', type: Number },
        { name: 'errsource', type: String },
        { name: 'message', type: String },
    ],
};
