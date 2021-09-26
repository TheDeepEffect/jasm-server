import { Prisma } from "@prisma/client";
import { nonNull, stringArg, subscriptionField } from "nexus";

export const latestComment = subscriptionField("latestComment", {
  type: "Comment",
  args: { id: nonNull(stringArg()) },
  subscribe(root, args, ctx) {
    return ctx.pubsub.asyncIterator("latestComment");
  },
  resolve(root: Prisma.CommentGetPayload<{}>, args, ctx) {
    const { id } = args;
    if (root.postId === id) {
      return root as Prisma.CommentGetPayload<{}>;
    }
    return null;
  },
});
