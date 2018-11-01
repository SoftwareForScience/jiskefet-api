[![Build Status](https://travis-ci.com/SoftwareForScience/jiskefet-api.svg?branch=master)](https://travis-ci.com/SoftwareForScience/jiskefet-api)
[![codecov](https://codecov.io/gh/SoftwareForScience/jiskefet-api/branch/master/graph/badge.svg)](https://codecov.io/gh/SoftwareForScience/jiskefet-api)


---

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
Copy **ormconfig.json.dist** as **ormconfig.json**.
```bash
$ cp ormconfig.json.dist ormconfig.json
```

Change **ormconfig.json** to your own db settings.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
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
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Dependencies

The project depends on the following packages in order to run properly.

```JSON
{
   "dependencies": {
    "@nestjs/common": "^5.1.0",
    "@nestjs/core": "^5.1.0",
    "@nestjs/swagger": "^2.5.1",
    "@nestjs/typeorm": "^5.2.1",
    "class-transformer": "^0.1.9",
    "class-validator": "^0.9.1",
    "dotenv": "^6.0.0",
    "mssql": "^4.2.1",
    "mysql": "^2.16.0",
    "reflect-metadata": "^0.1.12",
    "rxjs": "^6.2.2",
    "typeorm": "^0.2.7",
    "typescript": "^3.0.1"
  },
  "devDependencies": {
    "@nestjs/testing": "^5.1.0",
    "@types/express": "^4.16.0",
    "@types/jest": "^23.3.1",
    "@types/node": "^10.7.1",
    "@types/supertest": "^2.0.5",
    "jest": "^23.5.0",
    "nodemon": "^1.18.3",
    "prettier": "^1.14.2",
    "rimraf": "^2.6.2",
    "supertest": "^3.1.0",
    "ts-jest": "^23.1.3",
    "ts-loader": "^4.4.2",
    "ts-node": "^7.0.1",
    "tsconfig-paths": "^3.5.0",
    "tslint": "5.11.0",
    "webpack": "^4.16.5",
    "webpack-cli": "^3.1.0",
    "webpack-node-externals": "^1.7.2"
  }
}
```
