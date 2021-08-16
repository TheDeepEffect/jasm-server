import { booleanArg, extendType, nonNull, stringArg } from "nexus";

export const post = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createPost", {
            type: "Post",
            args: { description: stringArg(), url: nonNull(stringArg()), isPrivate: booleanArg() },
            async resolve(_, args, ctx) {
                const data = {
                    ...args,
                    author: {
                        connect: { id: ctx.userId }
                    }
                }
                const newPost = await ctx.prisma.post.create({ data });
                ctx.pubsub.publish('latestPost', newPost);
                return newPost;
            }
        });
        t.field("deletePost", {
            type: "Post",
            args: { id: nonNull(stringArg()) },
            async resolve(_, args, ctx) {
                return await ctx.prisma.post.delete({ where: { id: args.id } })
            }
        })
        t.field("updatePost", {
            type: 'Post',
            args: {
                id: nonNull(stringArg()),
                description: stringArg(),
                url: nonNull(stringArg()),
                isPrivate: booleanArg()
            },
            async resolve(_, args, ctx) {
                const { id, ...rest } = args;
                return await ctx.prisma.post.update({
                    where: { id },
                    data: {
                        ...rest
                    }
                })
            }
        })
    }
})