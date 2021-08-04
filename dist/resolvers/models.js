"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupResult = exports.LoginResult = exports.UserAlreadyExistsError = exports.InvalidUserError = exports.AuthPayload = exports.Follow = exports.Comment = exports.Like = exports.User = exports.Post = exports.GQLDate = void 0;
var nexus_1 = require("nexus");
var graphql_scalars_1 = require("graphql-scalars");
/* tslint:disable */
exports.GQLDate = nexus_1.asNexusMethod(graphql_scalars_1.DateTimeResolver, "date");
exports.Post = nexus_1.objectType({
    name: "Post",
    definition: function (t) {
        t.id("id");
        t.string("url");
        t.date("createdAt");
        t.date("updatedAt");
        t.string("description");
        t.field("author", {
            type: "User",
            resolve: function (post, _, ctx) {
                return ctx.prisma.post
                    .findFirst({
                    where: {
                        id: post.id,
                    },
                })
                    .author();
            },
        });
        t.list.field("likes", {
            type: "Like",
            resolve: function (post, _, ctx) {
                return ctx.prisma.post
                    .findFirst({
                    where: { id: post.id },
                })
                    .likes();
            },
        });
    },
});
exports.User = nexus_1.objectType({
    name: "User",
    definition: function (t) {
        t.id("id");
        t.string("name");
        t.string("email");
        t.string("username");
        t.date("createdAt");
        t.list.field("posts", {
            type: "Post",
            resolve: function (user, _, ctx) {
                return ctx.prisma.user.findFirst({ where: { id: user.id } }).posts();
            },
        });
        t.list.field("comments", {
            type: 'Comment',
            resolve: function (user, _, ctx) {
                return ctx.prisma.user.findFirst({ where: { id: user.id } }).comments();
            }
        });
        t.list.field("likes", {
            type: 'Like',
            resolve: function (user, _, ctx) {
                return ctx.prisma.user.findFirst({ where: { id: user.id } }).likedPosts();
            }
        });
    },
});
exports.Like = nexus_1.objectType({
    name: "Like",
    definition: function (t) {
        t.id("id");
        t.field("post", {
            type: "Post",
            resolve: function (like, _, ctx) {
                return ctx.prisma.like.findFirst({ where: { id: like.id } }).post();
            },
        });
        t.field("user", {
            type: "User",
            resolve: function (like, _, ctx) {
                return ctx.prisma.like.findFirst({ where: { id: like.id } }).user();
            },
        });
    },
});
exports.Comment = nexus_1.objectType({
    name: 'Comment',
    definition: function (t) {
        t.id("id");
        t.string("content");
        t.field("post", {
            type: "Post",
            resolve: function (comment, _, ctx) {
                return ctx.prisma.comment.findFirst({ where: { id: comment.id } }).post();
            },
        });
        t.field("user", {
            type: "User",
            resolve: function (comment, _, ctx) {
                return ctx.prisma.comment.findFirst({ where: { id: comment.id } }).user();
            },
        });
    }
});
exports.Follow = nexus_1.objectType({
    name: "Follow",
    definition: function (t) {
        t.id("id");
        t.field("followToUser", {
            type: "User",
            resolve: function (follow, _, ctx) {
                return ctx.prisma.follow.findFirst({ where: { id: follow.id } }).followToUser();
            }
        });
        t.field("followByUser", {
            type: "User",
            resolve: function (follow, _, ctx) {
                return ctx.prisma.follow.findFirst({ where: { id: follow.id } }).followByUser();
            }
        });
    }
});
exports.AuthPayload = nexus_1.objectType({
    name: 'AuthPayload',
    definition: function (t) {
        t.field('user', { type: 'User' });
    },
});
exports.InvalidUserError = nexus_1.objectType({
    name: 'InvalidUser',
    definition: function (t) {
        t.nonNull.string("message");
    }
});
exports.UserAlreadyExistsError = nexus_1.objectType({
    name: 'UserAlreadyExists',
    definition: function (t) {
        t.nonNull.string("message");
    }
});
exports.LoginResult = nexus_1.unionType({
    name: 'LoginResult',
    definition: function (t) {
        t.members('AuthPayload', "InvalidUser");
    },
    resolveType: function (t) {
        // @ts-ignore
        return t.__typename;
    }
});
exports.SignupResult = nexus_1.unionType({
    name: 'SignupResult',
    definition: function (t) {
        t.members('AuthPayload', 'UserAlreadyExists');
    },
    resolveType: function (t) {
        // @ts-ignore
        return t.__typename;
    },
});
//# sourceMappingURL=models.js.map