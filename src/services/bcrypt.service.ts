/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BCryptService {
    // private saltRounds: number = process.env.NUMBER_SALT_ROUNDS;
    private saltRounds: number = 10;

    /**
     * Hash token with bcrypt
     * @param token string
     */
    async hashToken(token: string): Promise<string> {
        console.log(`hashing token ${token}`);
        return bcrypt.hash(token, this.saltRounds).then((hash) => {
            console.log(`hash is: ${hash}`);
            return hash;
        });
    }

    /**
     * Decrypt hashed tokens
     * @param token string
     * @param hash string
     */
    async checkToken(token: string, hash: string): Promise<boolean> {
        console.log(`token value is \n${token} and hash value is \n ${hash}`);
        return bcrypt.compare(token, hash).then((res) => {
            console.log('result is: ');
            console.log(res);
            console.log(`type of res is ${typeof (res)}`);
            return res;
        });
    }
}
