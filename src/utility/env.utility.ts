/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */
import MissingEnvException from '../exceptions/MissingEnvException';
export class EnvironmentUtility {
    /**
     * Check if process.env['key'] has been set.
     * https://github.com/ekmartin/check-env/blob/master/index.js
     * @param keys array of environment variables
     */
    public checkEnv(keys: string[], values?: string[]): void {
        const missing: string[] = [];
        const errorMsg: string[] = [];
        let regex: RegExp;
        let possibleValues: string[];

        keys.forEach((key) => {
            if (!process.env[key]) {
                missing.push(key);
            }
        });

        if (missing.length) {
            if (missing.length === 1) {
                throw new MissingEnvException('Missing environment variable ' + missing[0]);
            }
            throw new MissingEnvException('Missing environment variables ' + missing.join(', '));
        }

        if (values) {
            for (let i: number = 0; i < keys.length; i++) {
                if (values[i].startsWith('regex:')) {
                    regex = new RegExp(values[i].replace('regex:', ''));
                    if (!regex.test(process.env[keys[i]])) {
                        errorMsg.push(`${process.env[keys[i]]} does not pass regex ${regex}`);
                    }
                } else if (values[i].startsWith('string:')) {
                    possibleValues = values[i].replace('string:', '').replace(' ', '').split(',');
                    if (possibleValues.indexOf(process.env[keys[i]]) === -1) {
                        errorMsg.push(`${process.env[keys[i]]} does not pass match ${possibleValues}`);
                    }
                }
            }
        }

    }

    /**
     * Check if process.env['key'] has placeholder values.
     * @param key Check if .env still contains placeholder strings
     * @param stringToCheck placeholder string to check for
     */
    public checkEnvPlaceholders(key: string, stringToCheck: string): void {
        if (process.env[key].includes(stringToCheck)) {
            throw new MissingEnvException('Placeholder detected at ' + process.env[key]);
        }
    }
}
