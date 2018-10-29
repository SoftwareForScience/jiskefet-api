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