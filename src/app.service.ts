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
    /**
     * Returns the response when navigating to the root/base url without a route (i.e. '/').
     */
    root(): string {
        return [
            `
            <h1 style="font-family: sans-serif; text-align: center; margin-top: 10rem;">
                Welcome to the Jiskefet API
                <br>
                <br>
                <a href="${process.env.USE_API_PREFIX === 'true' ? '/api' : ''}/doc/">
                    <button type="button" style="
                        font-size: 2rem;
                        padding: 10px 20px;
                        border-radius: 5px;
                        color: white;
                        background-color: #89bf04;
                        box-shadow: 0px 1px 2px 1px #00000021;
                        border: 0px;
                        cursor: pointer;
                    ">
                        Go to Swagger API doc
                    </button>
                </a>
            </h1>
            `
        ].join('');
    }
}
