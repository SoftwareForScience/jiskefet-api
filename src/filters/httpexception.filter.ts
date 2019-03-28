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
    // tslint:disable-next-line:typedef
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        // const stackTrace = exception.stack;
        // let msg: string;
        // if (String(exception.message).trim.toString() !== '') {
        //     msg = exception.message;
        // } else {
        //     msg = 'Oof, something went wrong';
        // }
        // console.log(msg);

        switch (process.env.NODE_ENV) {
            case 'dev':
                response
                    .status(status)
                    .json({
                        statusCode: status,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                        apiVersion: (global as any).apiVersion,
                        error: {
                            error: exception.name ? exception.name : HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR],
                            code: status,
                            message: exception.message ? exception.message : 'Oof, something went wrong',
                            details: exception.stack
                        }
                    });
                break;
            default:
                response
                    .status(status)
                    .json({
                        statusCode: status,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                        apiVersion: (global as any).apiVersion,
                        error: {
                            error: exception ? exception.name : HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR],
                            code: status,
                            message: exception.message ? exception.message : 'Oof, something went wrong',
                        }
                    });
        }
    }
}
