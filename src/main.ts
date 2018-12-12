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
