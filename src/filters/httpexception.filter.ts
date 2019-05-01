/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        // const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const errorObject: any = exception.message;
        let errorMsg: string = exception.message.error;
        // customErrorMsg gets filled
        const customErrorMsg: string = exception.message.message;

        // remove this field so the errorResponse stays uniform
        delete exception.message.message;

        // If there is a case that both error message variables are undefined, set errorMsg.
        if (errorMsg === undefined && customErrorMsg === undefined) {
            errorMsg = '😱! Something went wrong';
        }

        if (errorObject.statusCode) {
            delete errorObject.error;
            delete errorObject.statusCode;
            errorObject.apiVersion = (global as any).apiVersion;
            errorObject.error = {
                error: exception.name,
                code: exception.getStatus(),
                message: errorMsg,
                customMessage: customErrorMsg
            };
        }

        switch (process.env.NODE_ENV) {
            case 'dev':
                errorObject.error.details = exception.stack;
                break;
            default:
        }

        response
            .status(status)
            .json(errorObject);
    }
}
