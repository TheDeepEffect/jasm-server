"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = exports.tokens = exports.ALLOWED_URL = exports.isDev = exports.APP_SECRET = void 0;
exports.APP_SECRET = process.env.APP_SECRET || "";
var isDev = function () { return process.env.NODE_ENV === 'development'; };
exports.isDev = isDev;
exports.ALLOWED_URL = process.env.ALLOWED_URL;
exports.tokens = {
    access: {
        name: 'ACCESS_TOKEN',
        expiry: '1d'
    },
};
exports.errors = {
    invalidUser: {
        __typename: 'InvalidUser',
        message: 'Invalid username or password',
    },
    userAlreadyExists: {
        __typename: 'UserAlreadyExists',
        message: 'User already exists!',
    },
};
//# sourceMappingURL=constants.js.map