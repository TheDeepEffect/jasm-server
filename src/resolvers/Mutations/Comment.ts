import { extendType, nonNull, stringArg } from "nexus";

export const comment = extendType({
    type: 'Mutation',
    definition(t) {
        t.field("addComment", {
            type: "Comment",
            args: { content: nonNull(stringArg()), postId: nonNull(stringArg()) },
            async resolve(_, args, ctx) {
                const data = {
                    content: args.content,
                    post: { connect: { id: args.postId } },
                    user: { connect: { id: ctx.userId } },
                };
                const newComment = await ctx.prisma.comment.create({ data });
                ctx.pubsub.publish("latestComment", newComment);
                return newComment;
            }
        });
        t.field("updateComment", {
            type: "Comment",
            args: {
                id: nonNull(stringArg()),
                content: nonNull(stringArg()),
            },
            async resolve(_, args, ctx) {
                return await ctx.prisma.comment.update({
                    where: { id: args.id },
                    data: {
                        content: args.content
                    }
                })
            }
        });
        t.field("deleteComment", {
            type: "Comment",
            args: { id: nonNull(stringArg()) },
            async resolve(_, args, ctx) {
                return await ctx.prisma.comment.delete({ where: { id: args.id } })
            }
        })
    }
})