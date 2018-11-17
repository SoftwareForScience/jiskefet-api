[![Build Status](https://travis-ci.com/SoftwareForScience/jiskefet-api.svg?branch=master)](https://travis-ci.com/SoftwareForScience/jiskefet-api)
[![codecov](https://codecov.io/gh/SoftwareForScience/jiskefet-api/branch/master/graph/badge.svg)](https://codecov.io/gh/SoftwareForScience/jiskefet-api)

# Jiskefet API
## Description
This bookkeeping system is a system for A Large Ion Collider Experiment
(ALICE) to keep track of what is happening to the data produced by the detectors. The electric signals produced by the various detectors which
together are the ALICE detector are being reconstructed, calibrated, compressed and used in numerous but specific ways. It is important to register  
how this is done to make a reproduction of data possible and thereby a validation of the information produced. The project is also known as the
Jiskefet project.  

This is the **back-end API** for the Jiskefet project.   
The **front-end UI** can be found here: https://github.com/SoftwareForScience/jiskefet-ui  
And the **Ansible playbook** to deploy the application can be found here: https://github.com/SoftwareForScience/sfs-ansible

## Installation

```bash
$ npm install
```

### Set db config

Copy **ormconfig.json.dist** as **ormconfig.json**.
```bash
# Create ormconfig.json file
$ cp ormconfig.json.dist ormconfig.json
```
Change **ormconfig.json** to your own variables.

### Set env variables

Copy the environment template that corresponds to your current environment:

```bash
# Create .env file
$ cp ./environments/{YOUR_ENV}.env.template .env
```

Change **.env** to your own variables.

## Running the app

```bash
$ npm run start

# or for development (watch mode)
$ npm run dev
```

## Database migration workflow
Automatic migration generation creates a new migration file and writes all sql queries that must be executed to make a new database or to update the database.
It is needed to specify where the dependency is located, that is the reason it's needed to put the following command infront of the normal typeorm command.
```bash
$ node_modules/ts-node/dist/bin.js node_modules/typeorm/cli.js
```

To check what sql queries are going to be made when changes are made in the entities is as follows
```bash
typeorm schema:log
```

To generate a migration file use the following command
```bash
typeorm migration:generate -n 'name-of-migration-file'
```
The file that will be created can be found at the path chosen in ormconfig.json, the default path stated in the dist is *src/migration/*.
The rule of thumb is to generate a migration after each entity change.

To execute all pending migrations use following command
```bash
typeorm migration:run
```

To revert the most recently executed migration use the following command
```bash
typeorm migration:revert
```

## Testing

```bash
# Run tests
$ npm run test

# Open code coverage stats from latest test run
$ npm run showcoverage
```

## Dependencies

The project depends on the following packages in order to *run* properly:

The framework chosen to develop this api in is called NestJS. NestJS has built in
functionality to create a scalable and loosely-coupled architecture. The Docs can
be found [here](https://docs.nestjs.com/)
```
"@nestjs/common": "^5.1.0"
"@nestjs/core": "^5.1.0"
"@nestjs/swagger": "^2.5.1"
"@nestjs/typeorm": "^5.2.1"
```

In order to validate and transform data coming in through HTTP requests, the
following packages are used:
```
"class-transformer": "^0.1.9"
"class-validator": "^0.9.1"
```

Dotenv is a zero-dependency module that loads environment variables 
from a .env file into process.env.
```
"dotenv": "^6.0.0"
```

In order to acces the mariaDB database, the node.js driver for mysql
is used. It is written in JavaScript, does not require compiling,
and is 100% MIT licensed.
```
"mssql": "^4.2.1"
"mysql": "^2.16.0"
```

The following packages are dependencies of NestJS.
```
"reflect-metadata": "^0.1.12"
"rxjs": "^6.2.2"
"typeorm": "^0.2.7"
```

TypeScript is a language for application-scale JavaScript. TypeScript 
adds optional types to JavaScript that support tools for large-scale 
JavaScript applications for any browser, for any host, on any OS.
TypeScript compiles to readable, standards-based JavaScript
```
"typescript": "^3.0.1"
```
