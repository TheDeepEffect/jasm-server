"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
var nexus_1 = require("nexus");
exports.user = nexus_1.extendType({
    type: 'Query',
    definition: function (t) {
        t.nonNull.list.field('users', {
            type: 'User',
            args: { filter: nexus_1.stringArg() },
            resolve: function (_, args, ctx) {
                if (args === null || args === void 0 ? void 0 : args.filter) {
                    return ctx.prisma.user.findMany({ where: { username: args.filter } });
                }
                return ctx.prisma.user.findMany();
            },
        });
    },
});
//# sourceMappingURL=User.js.map