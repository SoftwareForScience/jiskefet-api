## Description
API for Jiskefet

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
```bash
$ node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:generate -n 'name-of-migration-file'
```
The file that will be created can be found at the path chosen in ormconfig.json, the default path stated in the dist is *src/migration/*.
The rule of thumb is to generate a migration after each entity change.

To execute all pending migrations use following command
```bash
$ node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run
```

To revert the most recently executed migration use the following command
```bash
$ node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:revert
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
