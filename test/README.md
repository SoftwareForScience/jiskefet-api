# Testing with Jest
This project uses [Jest](https://jestjs.io/en/) as a testing framework. 

## Run tests
Steps:

* Make sure to have a (empty) database made for testing only that has its credentials set in `.env`. See [database setup](#Database_setup) for more info.
* Run tests:

    ```bash
    # Via test script in package.json
    $ npm run test

    # Manually
    $ npx jest

    # Just one file (it will search files in the <project_root>/test directory)
    $ npx jest run.controller.e2e-spec.ts

    # Also works with wildcards
    $ npx jest run.c*
    ```

## View coverage report
To view the coverage report in your browser:

```bash
$ npm run showcoverage
```

## Database setup
Instead of running tests directly on the database defined in `ormconfig.json`, tests use a separate database that is defined in `.env` under the fields starting with '`TEST_DB_`'. This ensures that running `$ npm run test` will never modify the primary database by accident.

### Automatic data population
In order to be able to run certain tests, the database will be partially populated automatically. The `populate` directory contains the migration file that populates the database whenever `$ npm run test` is run.