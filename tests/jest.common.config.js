const path = require('path');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            isolatedModules: false,
            tsConfig: path.resolve(__dirname, './tsconfig.common.json'),
        },
    },
    transform: {
        '[.]ts$': 'ts-jest',
    },
};
