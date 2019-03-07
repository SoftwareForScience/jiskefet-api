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
    InnerError
} from '../interfaces/response_object.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

const version = '0.1.0';

export const createResponseItem = <T>(item: T, meta?: Meta, additionalData?: any): SuccessObject<T> => {
    return {
        apiVersion: version,
        meta,
        data: {
            ...additionalData,
            item
        },
    };
};

export const createResponseItems = <T>(
    items: any[], meta?: Meta, additionalData?: any): CollectionSuccessObject<T> => {
    return {
        apiVersion: version,
        meta,
        data: {
            ...additionalData,
            items
        },
    };
};

export const createErrorResponse = (
    httpError: HttpException, meta?: Meta, innerError?: InnerError, details?: ErrorObject[]): any => {
    if (httpError instanceof HttpException) {
        throw new HttpException({
            apiVersion: version,
            meta,
            error: {
                error: httpError.name,
                code: httpError.getStatus(),
                message: httpError.message,
                details,
                innerError
            },
        },
                                httpError.getStatus());
    }
    throw new HttpException('Oops, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
};
