/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

 /**
  * Interface to standardize the response of a API object
  */
export interface ResponseObject {
    apiVersion: string;
    meta?: Meta;
    data?: {
        [key: string]: any;
        items?: any[];
        item?: any;
    };

    error?: {
        errorCode: number; // 404
        codeMessage: string; // Not found
        customMessage?: string; // custom message 'Hello , world not found!'
        [key: string]: any;
    };
}

export interface Meta {
    [key: string]: string;
}
