import { Prisma } from "@prisma/client";
import { subscriptionField } from "nexus";

export const latestPost = subscriptionField("latestPost", {
    type: 'Post',
    subscribe(root, args, ctx) {
        return ctx.pubsub.asyncIterator("latestPost");
    },
    resolve(payload) {
        return payload as Prisma.PostGetPayload<{}>
    }
})