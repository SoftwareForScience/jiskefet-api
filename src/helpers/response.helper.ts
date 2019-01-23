/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ResponseObject, Meta, CollectionResponseObject } from '../interfaces/response_object.interface';
import { HttpException } from '@nestjs/common';

export const createResponseItem = <T>(item: T, meta?: Meta, additionalData?: any): ResponseObject<T> => {
    return {
        apiVersion: '0.1.0',
        meta,
        data: {
            ...additionalData,
            item
        },
    };
};

export const createResponseItems = <T>(
    items: any[], meta?: Meta, additionalData?: any): CollectionResponseObject<T> => {
    return {
        apiVersion: '0.1.0',
        meta,
        data: {
            ...additionalData,
            items
        },
    };
};

export const createErrorResponse = <T>(httpError: HttpException, meta?: Meta): ResponseObject<T> => {
    if (httpError instanceof HttpException) {
        return {
            apiVersion: '0.1.0',
            meta,
            error: {
                statusCode: httpError.getStatus(),
                error: httpError.name,
                message: httpError.message,
                stack: httpError.stack
            },
        };
    }
};
