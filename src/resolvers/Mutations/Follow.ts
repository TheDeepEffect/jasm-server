import { extendType, nonNull, stringArg } from "nexus";

export const follow = extendType({
    type: 'Mutation',
    definition(t) {
        t.field("follow", {
            type: "Follow",
            args: { userToId: nonNull(stringArg()) },
            async resolve(_, args, ctx) {
                const data = {
                    followToUser: { connect: { id: args.userToId } },
                    followByUser: { connect: { id: ctx.userId } }
                }
                const newFollow = await ctx.prisma.follow.create({ data });
                ctx.pubsub.publish("newFollow", newFollow);
                return newFollow;
            }
        });
        t.field("unfollow", {
            type: "Follow",
            args: { id: nonNull(stringArg()) },
            async resolve(_, args, ctx) {
                return await ctx.prisma.follow.delete({ where: { id: args.id } })
            }
        })
    }
})