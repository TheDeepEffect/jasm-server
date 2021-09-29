import { prisma } from ".prisma/client";
import { extendType, nonNull, stringArg } from "nexus";

export const like = extendType({
  type: "Mutation",
  definition(t) {
    t.field("like", {
      type: "Like",
      args: { postId: nonNull(stringArg()) },
      async resolve(_, args, ctx) {
        const newLike = await ctx.prisma.like.create({
          data: {
            user: { connect: { id: ctx.userId } },
            post: { connect: { id: args.postId } },
          },
        });

        ctx.pubsub.publish("latestLikes", newLike);
        return newLike;
      },
    });
    t.field("unlike", {
      type: "Like",
      args: { id: nonNull(stringArg()) },
      async resolve(_, args, ctx) {
        const unlike = await ctx.prisma.like.delete({
          where: {
            id: args.id,
          },
        });
        ctx.pubsub.publish("latestUnlikes", unlike);
        return unlike;
      },
    });
  },
});
