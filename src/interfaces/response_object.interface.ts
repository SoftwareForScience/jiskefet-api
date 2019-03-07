/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/**
 * Interface of information for every API response
 */
export interface ResponseObject {
    apiVersion: string;
    meta?: Meta;
}

/**
 * Interface to standardize the response of a API object containing a single item
 */
export interface SuccessObject<T> extends ResponseObject {
    data?: {
        [key: string]: any;
        item: T;
    };
}

/**
 * Interface to standardize the response of a API object containing multiple items
 */
export interface CollectionSuccessObject<T> extends ResponseObject {
    data?: {
        [key: string]: any;
        items: T[];
    };
}

/**
 * Interface to standardize the error response of the API
 */
export interface ErrorObject extends ResponseObject {
    error: {
        error: string;
        code: number;
        message: string;
        details?: ErrorObject[];
        innerError?: InnerError;
    };
}

/**
 * Interface for Meta object
 */
export interface Meta {
    [key: string]: string;
}

/**
 * Interface for page options
 */
export interface AdditionalOptions {
    itemsPerPage?: number;
    totalItems?: number;
    pageIndex?: number | string;
    totalPages?: number | string;
    [key: string]: number | string;
}

/**
 * Interface for InnerError object
 */
export interface InnerError {
    code: string;
    innerError: InnerError;
}
