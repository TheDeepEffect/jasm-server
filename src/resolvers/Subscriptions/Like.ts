import { Prisma } from "@prisma/client";
import { subscriptionField } from "nexus";

export const latestLike = subscriptionField("latestLike", {
    type: 'Like',
    subscribe(root, args, ctx) {
        return ctx.pubsub.asyncIterator("latestLike");
    },
    resolve(payload) {
        return payload as Prisma.LikeGetPayload<{}>
    }
})