/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

export class EnvironmentUtility {
    /**
     * Check if process.env['key'] has been set.
     * https://github.com/ekmartin/check-env/blob/master/index.js
     * @param keys array of environment variables
     */
    public checkEnv(keys: string[]): void {
        const missing: string[] = [];

        keys.forEach((key) => {
            if (!process.env[key]) {
                missing.push(key);
            }
        });

        if (missing.length) {
            if (missing.length === 1) {
                throw new Error('Missing environment variable ' + missing[0]);
            }
            throw new Error('Missing environment variables ' + missing.join(', '));
        }
    }

    /**
     * Check if process.env['key'] has placeholder values.
     * @param key Check if .env still contains placeholder strings
     * @param stringToCheck placeholder string to check for
     */
    public checkEnvPlaceholders(key: string, stringToCheck: string): void {
        if (process.env[key].includes(stringToCheck)) {
            throw new Error('Placeholder detected at ' + process.env[key]);
        }
    }
}
