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
import * as bodyParser from 'body-parser';
import { InfoLogService } from './services/infolog.service';
import * as cron from 'node-cron';
import * as checkEnv from 'check-env';

/**
 * Check the .env against the array of variables.
 * if one of the variables is missing, the program will exit.
 */
function preCheck(): void {
    checkEnv([
        'PORT',
        'USE_API_PREFIX',
        'USE_CERN_SSO',
        'JWT_SECRET_KEY',
        'JWT_EXPIRE_TIME',
        'SUB_SYSTEM_TOKEN_EXPIRES_IN',
        'USE_INFO_LOGGER'
    ]);

    if (process.env.USE_CERN_SSO === 'true') {
        checkEnv([
            'CERN_CLIENT_ID',
            'CERN_CLIENT_SECRET',
            'CERN_AUTH_TOKEN_HOST',
            'CERN_AUTH_TOKEN_PATH',
            'CERN_RESOURCE_API_URL',
            'CERN_AUTH_URL'
        ]);
    }
    checkEnv([
        'GITHUB_CLIENT_ID',
        'GITHUB_CLIENT_SECRET',
        'GITHUB_AUTH_TOKEN_HOST',
        'GITHUB_AUTH_TOKEN_PATH',
        'GITHUB_RESOURCE_API_URL',
        'GITHUB_AUTH_URL'
    ]);
}

preCheck();

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    // Increases the packet limit to 15MB instead of the default 100kb
    app.use(bodyParser.json({ limit: 15000000 }));
    app.use(bodyParser.urlencoded({ limit: 15000000, extended: true }));

    const options = new DocumentBuilder()
        .setTitle('Jiskefet')
        .setVersion('0.1.0')
        .addTag('logs')
        .addTag('runs')
        .addBearerAuth();

    if (process.env.USE_API_PREFIX === 'true') {
        // set /api as basePath for non local
        options.setBasePath('/api');
        options.setDescription('Running with /api prefix');
    } else {
        options.setDescription('Running without /api prefix');
    }

    const document = SwaggerModule.createDocument(app, options.build());
    SwaggerModule.setup('doc', app, document);

    if (process.env.USE_INFO_LOGGER === 'true') {
        app.useLogger(app.get(InfoLogService));

        // Periodically save InfoLogs that failed to be persisted to the db.
        cron.schedule('*/15 * * * *', () => {
            app.get(InfoLogService).saveUnsavedInfologs();
        });
    }

    await app.listen(process.env.PORT);
}
bootstrap();
