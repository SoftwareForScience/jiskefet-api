/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */
import MissingEnvException from '../exceptions/MissingEnvException';
import EnvValueDoesNotMatchException from '../exceptions/EnvValueDoesNotMatchException';
export class EnvironmentUtility {
    /**
     * Check if process.env['key'] has been set.
     * If values is provided, the function will also check if process.env['key'] matches the provided values.
     * The provided values array must have the same size as the keys array
     *
     * @param keys array of environment variables
     * @param values array of values to match the env['key'] against,
     * please start the string with either 'regex:', 'string:' or 'endsWith:'.
     * If an index is left empty, the process.env['key']'s value won't be checked
     */
    public checkEnv(keys: string[], values?: string[]): void {
        const missing: string[] = [];
        const errorMsg: string[] = [];

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
                // Retrieve the starting keyword in order to determine which case to use
                const startingKey: string = values[i].substr(0, values[i].indexOf(':'));

                switch (startingKey) {
                    case 'regex':
                        let regex: RegExp;
                        regex = new RegExp(values[i].replace('regex:', '').replace(/\s/g, ''));
                        console.log(`checking ${process.env[keys[i]]} against ${regex}`);
                        if (!regex.test(process.env[keys[i]])) {
                            errorMsg.push(`${[keys[i]]} does not pass regex ${regex}.`);
                        }
                        break;
                    case 'string':
                        let possibleValues: string[];
                        possibleValues = values[i].replace('string:', '').replace(/\s/g, '').split(',');
                        console.log(`checking ${process.env[keys[i]]} against ${possibleValues}`);
                        if (possibleValues.indexOf(process.env[keys[i]]) === -1) {
                            errorMsg.push(`${[keys[i]]} does not match the possible string(s): ${possibleValues}.`);
                        }
                        break;
                    case 'endsWith':
                        const endingString: string = values[i].replace('endsWith:', '').replace(/\s/g, '');
                        console.log(`checking ${process.env[keys[i]]} against ${endingString}`);
                        if (!process.env[keys[i]].endsWith(endingString)) {
                            errorMsg.push(`${[keys[i]]} does not end with ${endingString}.`);
                        }
                        break;
                    default:
                }
            }
        }

        if (errorMsg.length) {
            if (errorMsg.length === 1) {
                throw new EnvValueDoesNotMatchException(
                    'Environment value does not match expected value: \n' + errorMsg[0]);
            }
            throw new EnvValueDoesNotMatchException(
                'Environment value does not match expected value: \n' + errorMsg.join('\n'));
        }
    }
}
