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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```