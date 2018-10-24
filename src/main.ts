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

async function bootstrap() {
  const envConfig = 'envConfig';
  const port = 'PORT';

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

  const options = new DocumentBuilder()
    .setTitle('ALICE-Bookkeeping')
    .setDescription('')
    .setVersion('1.0')
    .addTag('log')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  let portNumber;
  if (process.env.NODE_ENV !== undefined) {
    portNumber = app.get('ConfigService')[envConfig][port];
  } else {
    portNumber = 3000;
  }
  await app.listen(portNumber);
}
bootstrap();
