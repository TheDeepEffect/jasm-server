import { Prisma } from "@prisma/client";
import { nonNull, stringArg, subscriptionField } from "nexus";

export const latestLike = subscriptionField("latestLike", {
  type: "Like",
  args: { id: nonNull(stringArg()) },
  subscribe(root, args, ctx) {
    return ctx.pubsub.asyncIterator("latestLike");
  },
  resolve(root: Prisma.LikeGetPayload<{}>, args, ctx) {
    const { id } = args;
    if (root.postId === id) {
      return root as Prisma.LikeGetPayload<{}>;
    }
    return null;
  },
});
