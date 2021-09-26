import { Prisma } from "@prisma/client";
import { subscriptionField } from "nexus";

export const newFollow = subscriptionField("newFollow", {
  type: "Follow",
  subscribe(root, args, ctx) {
    return ctx.pubsub.asyncIterator("newFollow");
  },
  resolve(root: Prisma.FollowGetPayload<{}>, args, ctx) {
    if (root.followTo === ctx.userId) {
      return root as Prisma.FollowGetPayload<{}>;
    }
    return null;
  },
});
