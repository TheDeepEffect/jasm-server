import { Prisma } from "@prisma/client";
import { subscriptionField } from "nexus";

export const latestPost = subscriptionField("latestPost", {
  type: "Post",
  subscribe(root, args, ctx) {
    return ctx.pubsub.asyncIterator("latestPost");
  },
  async resolve(root: Prisma.PostGetPayload<{}>, args, ctx) {
    const currentPost = await ctx.prisma.post.findFirst({
      where: {
        AND: [
          { id: root.id },
          { NOT: { authorId: ctx.userId } },
          {
            OR: [
              { author: { followers: { some: { followBy: ctx.userId } } } },
              { isPrivate: false },
            ],
          },
        ],
      },
    });
    return currentPost as Prisma.PostGetPayload<{}>;
  },
});
