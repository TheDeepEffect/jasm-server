"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = exports.returnError = exports.generateCookie = exports.generateAccessToken = exports.prisma = void 0;
var client_1 = require("@prisma/client");
var graphql_subscriptions_1 = require("graphql-subscriptions");
var constants_1 = require("./constants");
exports.prisma = new client_1.PrismaClient();
var pubsub = new graphql_subscriptions_1.PubSub();
var jsonwebtoken_1 = require("jsonwebtoken");
var generateAccessToken = function (userId) {
    var accessToken = jsonwebtoken_1.sign({
        userId: userId,
        type: constants_1.tokens.access.name,
        timestamp: Date.now(),
    }, constants_1.APP_SECRET, {
        expiresIn: constants_1.tokens.access.expiry,
    });
    return accessToken;
};
exports.generateAccessToken = generateAccessToken;
var generateCookie = function (userId) {
    var accessToken = exports.generateAccessToken(userId);
    return {
        name: "Token",
        value: accessToken,
        options: {
            httpOnly: true,
            maxAge: 43200,
            sameSite: "none",
            secure: true
        }
    };
};
exports.generateCookie = generateCookie;
var returnError = function (error) {
    return constants_1.errors[error];
};
exports.returnError = returnError;
var createContext = function (ctx) {
    var _a, _b, _c;
    var userId;
    try {
        var Authorization = '';
        try {
            // For queries and mutations
            Authorization = (_a = ctx.req.cookies) === null || _a === void 0 ? void 0 : _a['Token'];
            console.log({ Authorization: Authorization });
        }
        catch (e) {
            // specifically for subscriptions as the above will fail
            // TODO : WS cookie setup here
            Authorization = (_c = (_b = ctx === null || ctx === void 0 ? void 0 : ctx.connection) === null || _b === void 0 ? void 0 : _b.context) === null || _c === void 0 ? void 0 : _c.Authorization;
        }
        var token = Authorization;
        var verifiedToken = jsonwebtoken_1.verify(token, constants_1.APP_SECRET);
        if (!verifiedToken.userId && verifiedToken.type !== constants_1.tokens.access.name)
            userId = "";
        else
            userId = verifiedToken.userId;
    }
    catch (e) {
        userId = "";
    }
    return __assign(__assign({}, ctx), { prisma: exports.prisma, pubsub: pubsub, setCookies: new Array(), setHeaders: new Array(), userId: userId });
};
exports.createContext = createContext;
//# sourceMappingURL=helpers.js.map