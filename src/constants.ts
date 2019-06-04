/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as dotenv from 'dotenv';
dotenv.config();
/**
 * This file maps all the process.env['key'] values to their respective variable. Whenever an environment key changes,
 * the changes only needs to be applied in this file instead of throughout the application.
 */

// Application wide settings
export const PORT = process.env.PORT ? process.env.PORT : 3000;
export const USE_API_BASE_PATH = process.env.USE_API_BASE_PATH;
export const USE_CERN_SSO = process.env.USE_CERN_SSO;
export const FILE_UPLOAD_LIMIT = process.env.FILE_UPLOAD_LIMIT ? +process.env.FILE_UPLOAD_LIMIT : 5;
export const APPLICATION_NAME = process.env.APPLICATION_NAME ? process.env.APPLICATION_NAME : 'Jiskefet';

// Database settings
export const TYPEORM_CONNECTION = process.env.TYPEORM_CONNECTION ? process.env.TYPEORM_CONNECTION : 'mysql';
export const TYPEORM_HOST = process.env.TYPEORM_HOST;
export const TYPEORM_USERNAME = process.env.TYPEORM_USERNAME;
export const TYPEORM_PASSWORD = process.env.TYPEORM_PASSWORD;
export const TYPEORM_DATABASE = process.env.TYPEORM_DATABASE;
export const TYPEORM_PORT = process.env.TYPEORM_PORT ? process.env.TYPEORM_PORT : 3306;
export const TYPEORM_SYNCHRONIZE = process.env.TYPEORM_SYNCHRONIZE ? process.env.TYPEORM_SYNCHRONIZE : 'true';
export const TYPEORM_LOGGING = process.env.TYPEORM_LOGGING ? process.env.TYPEORM_LOGGING : 'false';

// OAuth settings
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Extra OAuth settings for CERN
export const CERN_REGISTERED_URI = process.env.CERN_REGISTERED_URI;

// JWT settings
export let JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export let JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME;
export let SUB_SYSTEM_TOKEN_EXPIRES_IN = process.env.SUB_SYSTEM_TOKEN_EXPIRES_IN;

// Set default values for Travis CI
if (process.env.NODE_ENV === 'test') {
    JWT_SECRET_KEY = 'hunter2LooksLikeStarsToMe';
    JWT_EXPIRE_TIME = '1h';
    SUB_SYSTEM_TOKEN_EXPIRES_IN = '2 days';
}

// InfoLogger setting
export const USE_INFO_LOGGER = process.env.USE_INFO_LOGGER ? process.env.USE_INFO_LOGGER : 'false';

// Test database settings used when running `$ npm test`
// Since Travis CI does not have a .env file, a new variable is created to set the name.
const TEST_DATABASE_NAME = TYPEORM_DATABASE ? 'test_' + TYPEORM_DATABASE : 'test_jiskefet';

export const TEST_DB_CONNECTION = process.env.TEST_DB_CONNECTION ? process.env.TEST_DB_CONNECTION : 'mysql';
export const TEST_DB_HOST = process.env.TEST_DB_HOST ? process.env.TEST_DB_HOST : '127.0.0.1';
export const TEST_DB_USERNAME = process.env.TEST_DB_USERNAME ? process.env.TEST_DB_USERNAME : 'root';
export const TEST_DB_PASSWORD = process.env.TEST_DB_PASSWORD;
export const TEST_DB_DATABASE = process.env.TEST_DB_DATABASE ?
    process.env.TEST_DB_DATABASE : TEST_DATABASE_NAME;
export const TEST_DB_PORT = process.env.TEST_DB_PORT ? process.env.TEST_DB_PORT : 3306;
export const TEST_DB_SYNCHRONIZE = process.env.TEST_DB_SYNCHRONIZE ? process.env.TEST_DB_SYNCHRONIZE : 'true';
export const TEST_DB_LOGGING = process.env.TEST_DB_LOGGING ? process.env.TEST_DB_LOGGING : 'true';

// Variables for the UI endpoint
export const AUTH_REDIRECT_URI = process.env.AUTH_REDIRECT_URI;
