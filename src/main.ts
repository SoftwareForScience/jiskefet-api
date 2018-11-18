/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(cookieParser());

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });

    const options = new DocumentBuilder()
        .setTitle('ALICE-Bookkeeping')
        .setVersion('1.0')
        .addTag('logs')
        .addTag('runs')
        .addOAuth2(
            'accessCode',
            `https://github.com/login/oauth/authorize?response_type=code&client_id=be996226c8f6d408b35f&redirect_uri=http://localhost:3000/callback&state=yx_4404.!dcbR%40YR44yQ`,
            'https://github.com/login/oauth/access_token'
        );

    if (process.env.USE_API_PREFIX === 'true') {
        // set /api as basePath for non local
        options.setBasePath('/api');
        options.setDescription('Running with /api prefix');
    } else {
        options.setDescription('Running without /api prefix');
    }

    const document = SwaggerModule.createDocument(app, options.build());
    SwaggerModule.setup('doc', app, document);

    await app.listen(process.env.PORT);
}
bootstrap();
