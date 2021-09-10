import { booleanArg, extendType, nonNull, stringArg } from "nexus";
import { deleteImages, getImageData } from "../../utils/helpers";

export const post = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createPost", {
            type: "Post",
            args: { description: stringArg(), url: nonNull(stringArg()), isPrivate: booleanArg() },
            async resolve(_, args, ctx) {
                const { url } = args;
                const publicId = (await getImageData(url)).public_id
                const data = {
                    ...args,
                    url: publicId,
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
                const currentPost = await ctx.prisma.post.findFirst({ where: { id: args.id } })
                if (currentPost) {
                    await deleteImages([currentPost.url]);
                }
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
                const { id, url, ...rest } = args;
                const publicId = (await getImageData(url)).public_id
                const currentPost = await ctx.prisma.post.findFirst({ where: { id } })
                if (currentPost) {
                    await deleteImages([currentPost.url]);
                }

                return await ctx.prisma.post.update({
                    where: { id },
                    data: {
                        ...rest,
                        url: publicId
                    }
                })
            }
        })
    }
})