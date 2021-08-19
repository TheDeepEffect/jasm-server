import { extendType, nonNull, stringArg } from "nexus";

export const like = extendType({
    type: 'Mutation',
    definition(t) {
        t.field("like", {
            type: 'Like',
            args: { postId: nonNull(stringArg()) },
            resolve(_, args, ctx) {
                const newLike = ctx.prisma.like.create({
                    data: {
                        user: { connect: { id: ctx.userId } },
                        post: { connect: { id: args.postId } }
                    }
                });
                ctx.pubsub.publish("latestLikes", newLike);
                return newLike;
            }
        });
        t.field("unlike", {
            type: "Like",
            args: { postId: nonNull(stringArg()) },
            resolve(_, args, ctx) {
                return ctx.prisma.like.delete({ where: { id: args.postId } })
            }
        })
    }
})