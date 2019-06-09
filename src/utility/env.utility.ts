/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */
import MissingEnvException from '../exceptions/MissingEnvException';
import EnvValueDoesNotMatchException from '../exceptions/EnvValueDoesNotMatchException';
import * as constants from '../constants';
import { Regex } from '../enums/env.enum';
export class EnvironmentUtility {
    /**
     * Check if constants['key'] has been set.
     * If values is provided, the function will also check if constants['key'] matches the provided values.
     * The values array must have the same size as the keys array
     *
     * @param keys array of environment variables
     * @param values array of values to match the constants['key'] against,
     * please start the string with either 'regex:', 'string:' or 'endsWith:'.
     * If an index is left empty, the constants['key']'s value won't be checked
     */
    public checkEnv(keys: string[], values?: string[]): void {
        const missing: string[] = [];
        const errorMsg: string[] = [];

        keys.forEach((key) => {
            // TODO: enforce all the constants[key] type to be string
            const value: string = String(constants[key]).trim();
            if (value === '' || value === undefined) {
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
                        const regex = new RegExp(values[i].replace('regex:', '').replace(/\s/g, ''));
                        if (!regex.test(constants[keys[i]])) {
                            switch (regex.source) {
                                case RegExp(Regex.IP_OR_URL_OR_LOCALHOST).source:
                                    errorMsg.push(`${[keys[i]]} is not a valid URL, IP- or localhost address.`);
                                    break;
                                case RegExp(Regex.PORT_NUMBER).source:
                                    errorMsg.push(`${[keys[i]]} must be a port number between 1 - 65535`);
                                    break;
                                case RegExp(Regex.BOOLEAN).source:
                                    errorMsg.push(`${[keys[i]]} is not a boolean value,
                                    expected value : true or false`);
                                    break;
                                default:
                                    errorMsg.push(`${[keys[i]]} does not pass regex ${regex}.`);
                            }
                        }
                        break;
                    case 'matches':
                        let possibleValues: string[];
                        possibleValues = values[i].replace('matches:', '').replace(/\s/g, '').split(',');
                        if (possibleValues.indexOf(constants[keys[i]]) === -1) {
                            errorMsg.push(`${[keys[i]]} does not match the possible string(s): ${possibleValues}.`);
                        }
                        break;
                    case 'endsWith':
                        const endingString: string = values[i].replace('endsWith:', '').replace(/\s/g, '');
                        if (!constants[keys[i]].endsWith(endingString)) {
                            errorMsg.push(`${[keys[i]]} does not end with ${endingString}.`);
                        }
                        break;
                    case 'typeof':
                        const typetoCheck: string = values[i].replace('typeof:', '').replace(/\s/g, '');
                        switch (typetoCheck) {
                            case 'isNumber':
                                if (isNaN(constants[keys[i]])) {
                                    errorMsg.push(`${[keys[i]]} is not a number.`);
                                }
                                break;
                            default:
                                errorMsg.push(`${typetoCheck} type has not been implemented yet.`);
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
