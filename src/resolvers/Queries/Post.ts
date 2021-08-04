import { extendType, intArg, nonNull, stringArg } from "nexus";

export const post=extendType({
    type: 'Query',
    definition(t) {
      t.list.field('feed', {
        type: 'Post',
        resolve(_, _args, ctx) {
          return ctx.prisma.post.findMany()
        },
      })
  
      t.field('post', {
        type: 'Post',
        args: { id: nonNull(stringArg()) },
        resolve(_, args, ctx) {
          return ctx.prisma.post.findFirst({ where: { id: args.id } })
        },
      })
    },

})