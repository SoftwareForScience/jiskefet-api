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
export interface ResponseObject<T> {
    apiVersion: string;
    meta?: Meta;
    data?: {
        [key: string]: any;
        item: T;
    };

    error?: {
        statusCode: number; // 404
        error: string; // Not found
        message?: string; // custom message 'Hello , world not found!'
        [key: string]: any;
    };
}

 /**
  * Interface to standardize the response of a API object containing a collection of items
  */
export interface CollectionResponseObject<T> {
    apiVersion: string;
    meta?: Meta;
    data?: {
        [key: string]: any;
        items: T[];
    };

    error?: {
        statusCode: number; // 404
        error: string ; // Not found
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
