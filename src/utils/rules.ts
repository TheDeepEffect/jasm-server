import { and, or, rule, shield } from "graphql-shield";
import { IRuleResult } from "graphql-shield/dist/types";
import { Context } from "../types";

export const rules = {
    isAuthenticatedUser: rule({ cache: "contextual" })(
        (_parent, _args, ctx: Context): IRuleResult => {
            try {
                if (ctx.userId) {
                    return true
                } else {
                    return Error("Unauthenticated User");
                }
            } catch (e: any) {
                return new Error(e);
            }
        }),
    isPostOwner: rule({ cache: "contextual" })(
        async (_parent, args, ctx: Context): Promise<IRuleResult> => {
            const id = args?.where ? args?.where?.id : args.id;
            try {
                const author = await ctx.prisma.post.findUnique({
                    where: { id }
                }).author();
                return ctx?.userId === author?.id
            } catch (e: any) {
                return e;
            }
        }),
    isCommentOwner: rule({ cache: "contextual" })(
        async (_parent, args, ctx: Context): Promise<IRuleResult> => {
            const id = args.where ? args?.where?.id : args.id;
            try {
                const author = await ctx.prisma.comment.findUnique({ where: { id } }).user();
                return ctx?.userId === author?.id;
            } catch (e: any) {
                return e;
            }
        }),
    isLikeOwner: rule({ cache: "contextual" })(
        async (_parents, args, ctx: Context): Promise<IRuleResult> => {
            const id = args.where ? args.where?.id : args?.id;
            try {
                const author = await ctx.prisma.like.findUnique({ where: { id } }).user();
                return ctx?.userId === author?.id
            } catch (e: any) {
                return e;
            }
        }),
    isFollowOwner: rule({ cache: "contextual" })(
        async (_parent, args, ctx: Context): Promise<IRuleResult> => {
            const id = args.where ? args.where?.id : args?.id;
            try {
                const author = await ctx.prisma.follow.findUnique({ where: { id } }).followByUser();
                return ctx.userId === author?.id
            } catch (e: any) {
                return e
            }
        }),
}

export const permissions = shield({
    Query: {
        feed: rules.isAuthenticatedUser,
        users: rules.isAuthenticatedUser,
        post: rules.isAuthenticatedUser,
        signature: rules.isAuthenticatedUser,
    },
    Mutation: {
        createPost: rules.isAuthenticatedUser,
        deletePost: and(rules.isAuthenticatedUser, rules.isPostOwner),
        updatePost: and(rules.isAuthenticatedUser, rules.isPostOwner),
        follow: rules.isAuthenticatedUser,
        unfollow: and(rules.isAuthenticatedUser, rules.isFollowOwner),
        like: rules.isAuthenticatedUser,
        unlike: and(rules.isAuthenticatedUser, rules.isLikeOwner),
        addComment: rules.isAuthenticatedUser,
        updateComment: and(rules.isAuthenticatedUser, rules.isCommentOwner),
        deleteComment: and(rules.isAuthenticatedUser, rules.isCommentOwner),
        logout: rules.isAuthenticatedUser,
        updateUser: rules.isAuthenticatedUser
    },
})