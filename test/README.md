# Testing with Jest
This project uses [Jest](https://jestjs.io/en/) as a testing framework. 

To run tests:

```
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

```
$ npm run showcoverage
```
