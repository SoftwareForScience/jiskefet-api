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
export let PORT = process.env.PORT ? process.env.PORT : 3000;
export const USE_API_BASE_PATH = process.env.USE_API_BASE_PATH;
export const USE_CERN_SSO = process.env.USE_CERN_SSO;

// Database credentials
export let TYPEORM_CONNECTION = process.env.TYPEORM_CONNECTION ? process.env.TYPEORM_CONNECTION : 'mysql';
export const TYPEORM_HOST = process.env.TYPEORM_HOST;
export const TYPEORM_USERNAME = process.env.TYPEORM_USERNAME;
export const TYPEORM_PASSWORD = process.env.TYPEORM_PASSWORD;
export const TYPEORM_DATABASE = process.env.TYPEORM_DATABASE;
export let TYPEORM_PORT = process.env.TYPEORM_PORT ? process.env.TYPEORM_PORT : 3306;
export let TYPEORM_SYNCHRONIZE = process.env.TYPEORM_SYNCHRONIZE ? process.env.TYPEORM_SYNCHRONIZE : 'true';
export let TYPEORM_LOGGING = process.env.TYPEORM_LOGGING ? process.env.TYPEORM_LOGGING : 'false';

// OAuth settings
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Extra OAuth settings for CERN
export const CERN_REGISTERED_URI = process.env.CERN_REGISTERED_URI;

// JWT settings
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME;
export const SUB_SYSTEM_TOKEN_EXPIRES_IN = process.env.SUB_SYSTEM_TOKEN_EXPIRES_IN;

// InfoLogger setting
export let USE_INFO_LOGGER = process.env.USE_INFO_LOGGER ? process.env.USE_INFO_LOGGER : 'false';

// Test database credentials used when running `$ npm test`
export let TEST_DB_CONNECTION = process.env.TEST_DB_CONNECTION ? process.env.TEST_DB_CONNECTION : 'mysql';
export const TEST_DB_HOST = process.env.TEST_DB_HOST;
export const TEST_DB_USERNAME = process.env.TEST_DB_USERNAME;
export const TEST_DB_PASSWORD = process.env.TEST_DB_PASSWORD;
export const TEST_DB_DATABASE = process.env.TEST_DB_DATABASE ?
    process.env.TEST_DB_DATABASE : 'test_' + TYPEORM_DATABASE;
export let TEST_DB_PORT = process.env.TEST_DB_PORT ? process.env.TEST_DB_PORT : 3306;
export let TEST_DB_SYNCHRONIZE = process.env.TEST_DB_SYNCHRONIZE ? process.env.TEST_DB_SYNCHRONIZE : 'true';
export let TEST_DB_LOGGING = process.env.TEST_DB_LOGGING ? process.env.TEST_DB_LOGGING : 'true';

// Variables for the UI endpoint
export const AUTH_REDIRECT_URI = process.env.AUTH_REDIRECT_URI;
