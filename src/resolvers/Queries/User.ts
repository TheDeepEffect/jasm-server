import { extendType, stringArg } from "nexus";

export const user = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: 'User',
      args: { filter: stringArg() },
      resolve(_, args, ctx) {
        if (args?.filter) {
          return ctx.prisma.user.findMany({ where: { username: args.filter } })
        }
        return ctx.prisma.user.findMany()
      },
    })
  },
})