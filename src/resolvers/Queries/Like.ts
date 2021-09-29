import { extendType, nonNull, stringArg } from "nexus";

export const like = extendType({
  type: "Query",
  definition(t) {
    t.list.field("likes", {
      type: "Like",
      args: {
        postId: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        const { postId } = args;
        return await ctx.prisma.like.findMany({
          where: {
            postId,
          },
        });
      },
    });
  },
});
