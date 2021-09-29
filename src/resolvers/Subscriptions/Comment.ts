import { Prisma } from "@prisma/client";
import { list, nonNull, stringArg, subscriptionField } from "nexus";

export const latestComment = subscriptionField("latestComment", {
  type: "Comment",
  args: { ids: list(nonNull(stringArg())) },
  subscribe(root, args, ctx) {
    return ctx.pubsub.asyncIterator("latestComment");
  },
  resolve(root: Prisma.CommentGetPayload<{}>, args, ctx) {
    const { ids } = args;
    if (ids?.includes(root.postId)) {
      return root as Prisma.CommentGetPayload<{}>;
    }
    return null;
  },
});
