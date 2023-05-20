const path = require('path');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '[.]ts$': [
            'ts-jest',
            {
                isolatedModules: false,
                tsConfig: path.resolve(__dirname, './tsconfig.common.json'),
            },
        ],
    },
};
