import { Prisma } from "@prisma/client";
import { subscriptionField } from "nexus";

export const latestComment = subscriptionField("latestComment", {
    type: 'Comment',
    subscribe(root, args, ctx) {
        return ctx.pubsub.asyncIterator("latestComment");
    },
    resolve(payload) {
        return payload as Prisma.CommentGetPayload<{}>
    }
})