import { extendType, stringArg } from "nexus";

export const user = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: 'User',
      args: { filter: stringArg() },
      async resolve(_, args, ctx) {
        if (args?.filter) {
          return await ctx.prisma.user.findMany({ where: { username: args.filter } })
        }
        return await ctx.prisma.user.findMany()
      },
    })
  },
})