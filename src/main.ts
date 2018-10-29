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

// A boolean to set the swagger api for debugging purposes
const runLocal = true;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

  const options = new DocumentBuilder()
      .setTitle('ALICE-Bookkeeping')
      .setVersion('1.0')
      .addTag('logs')
      .addTag('runs');

  if (runLocal) {
    options.setDescription('Running locally');
    const document = SwaggerModule.createDocument(app, options.build());
    SwaggerModule.setup('doc', app, document);
  } else {
    // set /api as basePath for non local
    options.setDescription('Running in VM');
    options.setBasePath('/api');
    const document = SwaggerModule.createDocument(app, options.build());
    SwaggerModule.setup('doc', app, document);
  }

  await app.listen(3000);
}
bootstrap();
