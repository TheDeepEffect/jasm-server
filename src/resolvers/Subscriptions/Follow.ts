import { Prisma } from "@prisma/client";
import { subscriptionField } from "nexus";

export const newFollow = subscriptionField("newFollow", {
    type: 'Follow',
    subscribe(root, args, ctx) {
        return ctx.pubsub.asyncIterator("newFollow");
    },
    resolve(payload) {
        return payload as Prisma.FollowGetPayload<{}>
    }
})