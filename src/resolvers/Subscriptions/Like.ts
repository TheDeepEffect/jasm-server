import { Prisma } from "@prisma/client";
import { nonNull, stringArg, subscriptionField } from "nexus";

export const latestLikes = subscriptionField("latestLikes", {
  type: "Like",
  args: { id: nonNull(stringArg()) },
  subscribe(root, args, ctx) {
    return ctx.pubsub.asyncIterator("latestLikes");
  },
  resolve(root: Prisma.LikeGetPayload<{}>, args, ctx) {
    const { id } = args;
    if (root.postId === id) {
      return root as Prisma.LikeGetPayload<{}>;
    }
    return null;
  },
});
