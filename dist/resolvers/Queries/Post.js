"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
var nexus_1 = require("nexus");
exports.post = nexus_1.extendType({
    type: 'Query',
    definition: function (t) {
        t.list.field('feed', {
            type: 'Post',
            resolve: function (_, _args, ctx) {
                return ctx.prisma.post.findMany();
            },
        });
        t.field('post', {
            type: 'Post',
            args: { id: nexus_1.nonNull(nexus_1.stringArg()) },
            resolve: function (_, args, ctx) {
                return ctx.prisma.post.findFirst({ where: { id: args.id } });
            },
        });
    },
});
//# sourceMappingURL=Post.js.map