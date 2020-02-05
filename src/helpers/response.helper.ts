/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import {
    Meta,
    CollectionSuccessObject,
    SuccessObject,
    ErrorObject,
    InnerError,
} from '../interfaces/response_object.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

export const createResponseItem = <T>(item: T, meta?: Meta, additionalData?: any): SuccessObject<T> => {
    return {
        apiVersion: (global as any).apiVersion,
        meta,
        data: {
            ...additionalData,
            item,
        },
    };
};

export const createResponseItems = <T>(
    items: any[], meta?: Meta, additionalData?: any): CollectionSuccessObject<T> => {
    return {
        apiVersion: (global as any).apiVersion,
        meta,
        data: {
            ...additionalData,
            items,
        },
    };
};

export const createErrorResponse = <T>(
    httpError: HttpException, meta?: Meta, innerError?: InnerError, details?: Array<ErrorObject<T>>): any => {
    let errorObject;
    let errorCode;
    if (typeof httpError.getStatus === 'function') {
        errorCode = httpError.getStatus();
    } else {
        errorCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const stackTrace = httpError.stack;
    switch (process.env.NODE_ENV) {
        case 'dev':
            errorObject = {
                apiVersion: (global as any).apiVersion,
                meta,
                error: {
                    error: httpError ? httpError.name : HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR],
                    code: errorCode,
                    message: httpError ? httpError.message : 'Oops, something went wrong',
                    details: stackTrace,
                    innerError,
                },
            };
            break;
        default:
            errorObject = {
                apiVersion: (global as any).apiVersion,
                meta,
                error: {
                    error: httpError ? httpError.name : HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR],
                    code: errorCode,
                    message: httpError ? httpError.message : 'Oops, something went wrong',
                    details,
                    innerError,
                },
            };
    }

    throw new HttpException(errorObject, errorCode);
};
