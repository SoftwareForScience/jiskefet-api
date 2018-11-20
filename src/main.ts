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
import bodyParser = require('body-parser');

const envConfig = 'envConfig';
const port = 'PORT';
const usePrefix = 'USE_API_PREFIX';
// A boolean to set the swagger api for debugging purposes
let useApiPrefix = false;

async function bootstrap(): Promise<void> {
  let portNumber;
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  if (process.env.NODE_ENV) {
    portNumber = app.get('ConfigService')[envConfig][port];
    useApiPrefix = app.get('ConfigService')[envConfig][usePrefix];
  } else {
    portNumber = 3000;
  }

  const options = new DocumentBuilder()
    .setTitle('ALICE-Bookkeeping')
    .setVersion('1.0')
    .addTag('logs')
    .addTag('runs');
  if (!useApiPrefix) {
    const document = SwaggerModule.createDocument(app, options.build());
    SwaggerModule.setup('doc', app, document);
  } else {
    // set /api as basePath for non local
    options.setBasePath('/api');
    const document = SwaggerModule.createDocument(app, options.build());
    SwaggerModule.setup('doc', app, document);
  }
  await app.listen(portNumber);
}
bootstrap();
