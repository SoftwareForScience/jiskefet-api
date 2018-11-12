/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): string {
    return [
      'Welcome to the Jiskefet API. Go to /doc for the Swagger API documentation.',
      '</br>Hello, <a href="/auth">Log in with Github</a>'].join('');
  }
}
