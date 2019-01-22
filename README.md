# Jiskefet API <!-- omit in toc -->

[![Build Status](https://travis-ci.com/SoftwareForScience/jiskefet-api.svg?branch=master)](https://travis-ci.com/SoftwareForScience/jiskefet-api)
[![codecov](https://codecov.io/gh/SoftwareForScience/jiskefet-api/branch/master/graph/badge.svg)](https://codecov.io/gh/SoftwareForScience/jiskefet-api)

## Description <!-- omit in toc -->

This bookkeeping system is a system for A Large Ion Collider Experiment
(ALICE) to keep track of what is happening to the data produced by the detectors. The electric signals produced by the various detectors which
together are the ALICE detector are being reconstructed, calibrated, compressed and used in numerous but specific ways. It is important to register  
how this is done to make a reproduction of data possible and thereby a validation of the information produced. The project is also known as the
Jiskefet project.  

This is the **back-end API** for the Jiskefet project.   
The **front-end UI** can be found here: https://github.com/SoftwareForScience/jiskefet-ui  
And the **Ansible playbook** to deploy the application can be found here: https://github.com/SoftwareForScience/sfs-ansible

## Table of Contents <!-- omit in toc -->

- [Running the app for **dev**](#running-the-app-for-dev)
- [Running the app for **prod**](#running-the-app-for-prod)
- [Documentation](#documentation)
  - [NestJS](#nestjs)
  - [TypeORM](#typeorm)
    - [Database migration workflow](#database-migration-workflow)
  - [Jest (testing)](#jest-testing)

## Running the app for **dev**

```bash
$ npm install

# Copy template as .env and set your own values.
$ cp ./environments/{YOUR_ENV}.env.template .env

# Running in watch mode (nodemon)
$ npm run dev
```

## Running the app for **prod**

```bash
$ npm install

# Copy .env.dist as .env and set your own values.
$ cp .env .env.dist
```

Now the project can be run with `$ npm run start` as a background process via a node process manager, e.g. [PM2](http://pm2.keymetrics.io/).

## Documentation

### NestJS

We use NestJS as a Node.js framework. NestJS has built in
functionality to create a scalable and loosely-coupled architecture.

- [NestJS official docs](https://docs.nestjs.com/)

### TypeORM

We use TypeORM as an Object Relational Mapping tool.

- [TypeORM official docs](http://typeorm.io/)

#### Database migration workflow

Automatic migration generation creates a new migration file and writes all sql queries that must be executed to make a new database or to update the database.

To check what sql queries are going to be made when changes are made in the entities is as follows

```bash
npm run typeorm schema:log
```

To generate a migration file use the following command

```bash
npm run typeorm migration:generate -n 'name-of-migration-file'
```

The file that will be created can be found at the path chosen in ormconfig.json, the default path stated in the dist is *src/migration/*.
The rule of thumb is to generate a migration after each entity change.

To execute all pending migrations use following command

```bash
npm run typeorm migration:run
```

To revert the most recently executed migration use the following command

```bash
npm run typeorm migration:revert
```

### Jest (testing)

We use Jest for testing.

```bash
# Run tests
$ npm run test

# Open code coverage stats from latest test run
$ npm run showcoverage

# To run the benchmark first change the target url to the appropriate url. To run the benchmark use:
$ artillery run api_benchmarks.yml
```

- [Jest readme in project](test/README.md)
- [Jest official docs](https://jestjs.io/docs/en/getting-started)
