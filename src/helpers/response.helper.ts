/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ResponseObject, Meta } from '../interfaces/response_object.interface';
import { HttpException } from '@nestjs/common';

export const createResponseItem = (item: any, meta?: Meta, additionalData?: any): ResponseObject => {
    return {
        apiVersion: '0.1.0',
        meta,
        data: {
            item,
            ...additionalData
        },
    };
};

export const createResponseItems = (items: any[], meta?: Meta, additionalData?: any): ResponseObject => {
    return {
        apiVersion: '0.1.0',
        meta,
        data: {
            items,
            ...additionalData
        },
    };
};

export const createErrorResponse = (httpError: HttpException, meta?: Meta): ResponseObject => {
    return {
        apiVersion: '0.1.0',
        meta,
        error: {
            errorCode: httpError.getStatus(),
            codeMessage: httpError.name,
            customMessage: httpError.message
        },
    };
};
