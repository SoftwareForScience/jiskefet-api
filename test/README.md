# Testing with Mocha
This project uses [Mocha](https://mochajs.org/) as a testing framework. 

To run tests:

```
$ npm run test
```

## Additional libraries
Mocha itself is pretty barebones and it needs additional libraries that help with testing. Some information on the libraries that this project uses is given below.

### Chai
[Chai](https://www.chaijs.com/) is used by Mocha as an assertion library. There are three variants when using chai (assert/expect/should). We use the 'expect' variant.

### Sinon
[Sinon](https://sinonjs.org/) provides test-doubles (spies, stubs and mocks) for Mocha.

# Test coverage
[Istanbul](https://istanbul.js.org/) is used for test coverage reports. [nyc](https://github.com/istanbuljs/nyc) is istanbul's CLI. 

Running `nyc` in front of your test command will execute your tests with mocha and then make a coverage report inside the *coverage* directory. 

Just run `$ npm run test` to also run nyc in front of your mocha tests.

## View coverage report
To view the coverage report in your browser:

```
$ npm run showcoverage
```

Which executes:
```JS
// package.json
{
    "scripts": {
        // other scripts ..
        "showcoverage": "open ./coverage/index.html"
    }
}
```