import { Prisma } from "@prisma/client";
import { list, nonNull, stringArg, subscriptionField } from "nexus";

export const latestLikes = subscriptionField("latestLikes", {
  type: "Like",
  args: { ids: list(nonNull(stringArg())) },
  subscribe(root, args, ctx) {
    return ctx.pubsub.asyncIterator("latestLikes");
  },
  resolve(root: Prisma.LikeGetPayload<{}>, args, ctx) {
    const { ids } = args;
    if (ids?.includes(root.postId)) {
      return root as Prisma.LikeGetPayload<{}>;
    }
    return null;
  },
});
export const latestUnlikes = subscriptionField("latestUnlikes", {
  type: "Like",
  args: { ids: list(nonNull(stringArg())) },
  subscribe(root, args, ctx) {
    return ctx.pubsub.asyncIterator("latestUnlikes");
  },
  resolve(root: Prisma.LikeGetPayload<{}>, args, ctx) {
    const { ids } = args;
    if (ids?.includes(root.postId)) {
      return root as Prisma.LikeGetPayload<{}>;
    }
    return null;
  },
});
