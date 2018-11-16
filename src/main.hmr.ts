/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

/**
 * This module is for hotloading the app while developing.
 * It reloads the app when changes are made to the code.
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
