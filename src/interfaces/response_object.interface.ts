/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

 /**
  * Interface to standardize the response of a API object containing a single item
  */
export interface ResponseObject {
    apiVersion: string;
    meta?: Meta;
}

export interface SuccessObject<T> extends ResponseObject {
    data: {
        [key: string]: any;
        item: T;
    };
}

export interface CollectionSuccessObject<T> extends ResponseObject {
    data: {
        [key: string]: any;
        items: T[];
    };
}

export interface ErrorObject extends ResponseObject {
    error: {
        statusCode: number; // 404
        error: string; // Not found
        message?: string; // custom message 'Hello , world not found!'
        [key: string]: any;
    };
}

export interface Meta {
    [key: string]: string;
}

export interface AdditionalOptions {
    itemsPerPage?: number;
    totalItems?: number;
    pageIndex?: number | string;
    totalPages?: number | string;
    [key: string]: number | string;
}
