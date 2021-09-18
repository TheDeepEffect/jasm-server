import { extendType, intArg, nonNull, stringArg } from "nexus";

export const post = extendType({
  type: "Query",
  definition(t) {
    t.list.field("feed", {
      type: "Post",
      args: { skip: intArg(), take: intArg() },
      async resolve(_parent, args, ctx) {
        const { skip, take } = args;
        return await ctx.prisma.post.findMany({
          skip: skip || undefined,
          take: take || undefined,
          where: {
            OR: [
              { author: { followers: { some: { followBy: ctx.userId } } } },
              { isPrivate: false },
              { authorId: ctx.userId },
            ],
          },
        });
      },
    });

    t.field("post", {
      type: "Post",
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
                  { authorId: ctx.userId },
                ],
              },
            ],
          },
        });
      },
    });
  },
});
