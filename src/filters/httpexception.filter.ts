/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        // const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        let errorObject: any;
        let errorMsg: string;
        // Check if exception.message is empty
        if (String(exception.message).trim.toString() !== '') {
            errorObject = exception.message;
            errorMsg = exception.message.error;
        } else {
            errorObject = 'Oof, something went wrong';
        }

        if (errorObject.statusCode) {
            delete errorObject.error;
            delete errorObject.statusCode;
            errorObject.apiVersion = (global as any).apiVersion;
            errorObject.error = {
                error: exception.name,
                code: exception.getStatus(),
                message: errorMsg,
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
