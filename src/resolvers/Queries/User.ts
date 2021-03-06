import { extendType, nonNull, stringArg } from "nexus";

export const user = extendType({
  type: "Query",
  definition(t) {
    t.list.field("users", {
      type: "User",
      args: { filter: stringArg() },
      async resolve(_, args, ctx) {
        if (args?.filter) {
          return await ctx.prisma.user.findMany({
            where: {
              OR: [
                { username: { contains: args.filter } },
                { email: { contains: args.filter } },
                { name: { contains: args.filter } },
              ],
            },
          });
        }
        return await ctx.prisma.user.findMany();
      },
    });
    t.field("currentUser", {
      type: "User",
      args: { username: nonNull(stringArg()) },
      async resolve(_, args, ctx) {
        return await ctx.prisma.user.findFirst({
          where: { username: args.username },
        });
      },
    });
  },
});
