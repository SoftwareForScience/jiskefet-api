module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ["**/test/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/test/mocks/*.*.ts"]
};