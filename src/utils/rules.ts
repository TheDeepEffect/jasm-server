import { and, or, rule, shield } from "graphql-shield";
import { Context } from "../types";

export const rules = {
    isAuthenticatedUser: rule({ cache: "contextual" })(
        async (_parent, _args, ctx: Context) => {
            try {
                if (ctx.userId) {
                    return true
                } else {
                    return Error("Unauthenticated User");
                }
            } catch (e) {
                return e;
            }
        }),
    isPostOwner: rule({ cache: "contextual" })(
        async (_parent, args, ctx: Context) => {
            const id = args?.where ? args?.where?.id : args.id;
            try {
                const author = await ctx.prisma.post.findUnique({
                    where: { id }
                }).author();
                return ctx?.userId === author?.id
            } catch (e) {
                return e;
            }
        }),
    isCommentOwner: rule({ cache: "contextual" })(
        async (_parent, args, ctx: Context) => {
            const id = args.where ? args?.where?.id : args.id;
            try {
                const author = await ctx.prisma.comment.findUnique({ where: { id } }).user();
                return ctx?.userId === author?.id;
            } catch (e) {
                return e;
            }
        }),
    isLikeOwner: rule({ cache: "contextual" })(
        async (_parents, args, ctx: Context) => {
            const id = args.where ? args.where?.id : args?.id;
            try {
                const author = await ctx.prisma.like.findUnique({ where: { id } }).user();
                return ctx?.userId === author?.id
            } catch (e) {
                return e;
            }
        }),
    isFollowOwner: rule({ cache: "contextual" })(
        async (_parent, args, ctx: Context) => {
            const id = args.where ? args.where?.id : args?.id;
            try {
                const author = await ctx.prisma.follow.findUnique({ where: { id } }).followByUser();
                return ctx.userId === author?.id
            } catch (e) {
                return e
            }
        }),
    isFollower: rule({ cache: "contextual" })(
        async (parent, args, ctx: Context) => {
            try {
                const followings = await ctx.prisma.user.findUnique({
                    where: { id: ctx?.userId },
                    select: { following: { where: { followTo: parent.authorId } } }
                })
                if (followings?.following?.length) {
                    return true;
                } else {
                    return new Error("Follow to see this content")
                }
            } catch (e) {
                return e;
            }
        }
    ),
    isPublicPost: rule({ cache: "contextual" })(
        (parent) => {
            if (!parent?.isPrivate) {
                return true;
            } else {
                return new Error("Post is private")
            }
        }
    )
}

export const permissions = shield({
    Query: {
        feed: rules.isAuthenticatedUser,
        users: rules.isAuthenticatedUser
    },
    Mutation: {
        createPost: rules.isAuthenticatedUser,
        deletePost: and(rules.isAuthenticatedUser, rules.isPostOwner),
        updatePost: and(rules.isAuthenticatedUser, rules.isPostOwner),
    }
})