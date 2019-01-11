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
import { EnvironmentUtility } from './utility/env.utility';
import { Regex } from './enums/env.enum';

/**
 * Check the .env against the array of variables.
 * if one of the variables is missing, the program will exit.
 */
function preCheck(): void {
    const envUtil = new EnvironmentUtility();
    let keys: string[] = [
        'PORT',
        'USE_API_PREFIX',
        'USE_CERN_SSO',
        'TYPEORM_CONNECTION',
        'TYPEORM_HOST',
        'TYPEORM_USERNAME',
        'TYPEORM_PASSWORD',
        'TYPEORM_DATABASE',
        'TYPEORM_PORT',
        'TYPEORM_SYNCHRONIZE',
        'TYPEORM_LOGGING',
        'JWT_SECRET_KEY',
        'JWT_EXPIRE_TIME',
        'SUB_SYSTEM_TOKEN_EXPIRES_IN',
        'CLIENT_ID',
        'CLIENT_SECRET',
        'AUTH_REDIRECT_URI'
    ];

    let values: string[] = [
        `regex:${Regex.PORT_NUMBER}`,
        `regex:${Regex.BOOLEAN}`,
        `regex:${Regex.BOOLEAN}`,
        'string:mysql, postgres, mariadb, mssql, mongodb',
        ``,
        '',
        '',
        '',
        `regex:${Regex.PORT_NUMBER}`,
        `regex:${Regex.BOOLEAN}`,
        `regex:${Regex.BOOLEAN}`,
        '',
        '',
        '',
        '',
        '',
        ``,
    ];

    envUtil.checkEnv(keys, values);
    // extra check if the AUTH_REDIRECT_URI contains callback
    envUtil.checkEnv(['AUTH_REDIRECT_URI'], ['endsWith: callback']);

    if (process.env.USE_CERN_SSO === 'true') {
        envUtil.checkEnv(['CERN_REGISTERED_URI'], [`regex:${Regex.IP_OR_URL_OR_LOCALHOST}`]);
    }

    if (process.env.NODE_ENV === 'test') {
        keys = [
            'TEST_DB_CONNECTION',
            'TEST_DB_HOST',
            'TEST_DB_USERNAME',
            'TEST_DB_PASSWORD',
            'TEST_DB_DATABASE',
            'TEST_DB_PORT',
            'TEST_DB_SYNCHRONIZE',
            'TEST_DB_LOGGING'
        ];

        values = [
            'string:mysql, postgres, mariadb, mssql, mongodb',
            `regex:${Regex.IP_OR_URL_OR_LOCALHOST}`,
            '',
            '',
            '',
            `regex:${Regex.PORT_NUMBER}`,
            `regex:${Regex.BOOLEAN}`,
            `regex:${Regex.BOOLEAN}`,
        ];

        envUtil.checkEnv(keys, values);
    }
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

    await app.listen(process.env.PORT ? process.env.PORT : 3000);
}
bootstrap();
