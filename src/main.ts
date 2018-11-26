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

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  // app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('ALICE-Bookkeeping')
    .setVersion('1.0')
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

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const document = SwaggerModule.createDocument(app, options.build());
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
