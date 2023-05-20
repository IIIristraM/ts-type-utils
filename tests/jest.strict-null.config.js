const path = require('path');
const config = require('./jest.common.config');

module.exports = {
    ...config,
    transform: {
        '[.]ts$': [
            'ts-jest',
            {
                isolatedModules: false,
                tsConfig: path.resolve(__dirname, './tsconfig.strict-null.json'),
            },
        ],
    },
};
