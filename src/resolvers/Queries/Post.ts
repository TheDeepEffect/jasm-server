import { extendType, intArg, nonNull, stringArg } from "nexus";

export const post = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('feed', {
      type: 'Post',
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.post.findMany({
          where: {
            OR: [
              { author: { followers: { some: { followBy: ctx.userId } } } },
              { isPrivate: false },
              { authorId: ctx.userId }
            ]
          }
        })
      },
    })

    t.field('post', {
      type: 'Post',
      args: { id: nonNull(stringArg()) },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.post.findFirst({
          where: {
            AND: [
              { id: args.id },
              {
                OR: [
                  { author: { followers: { some: { followBy: ctx.userId } } } },
                  { isPrivate: false },
                  { authorId: ctx.userId }
                ]
              }
            ]
          }
        })
      },
    })
  },

})