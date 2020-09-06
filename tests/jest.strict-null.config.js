const path = require('path');
const config = require('./jest.common.config');

module.exports = {
    ...config,
    globals: {
        ...config.globals,
        'ts-jest': {
            ...config.globals['ts-jest'],
            tsConfig: path.resolve(__dirname, './tsconfig.strict-null.json'),
        },
    },
};
