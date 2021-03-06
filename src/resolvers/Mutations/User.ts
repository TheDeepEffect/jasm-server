import { extendType, nonNull, stringArg } from "nexus";
import { compare, hash } from "bcrypt";
import { deleteImages, generateCookie, getImageData, returnError } from "../../utils/helpers";
import { Context } from "../../types";
export const user = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('signup', {
            type: 'SignupResult',
            args: {
                name: nonNull(stringArg()),
                username: nonNull(stringArg()),
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
                profile_pic: stringArg()
            },
            async resolve(parent, { name, username, password, email, profile_pic }, ctx) {
                try {
                    const hashedPassword = await hash(password, 10);
                    let publicId = null;
                    if (profile_pic) {
                        const data = await getImageData(profile_pic)
                        publicId = data.public_id;
                    }
                    const user = await ctx.prisma.user.create({
                        data: {
                            name, username, email, password: hashedPassword,
                            profile_pic: publicId
                        }
                    });
                    const { cookie, expiresAt } = generateCookie(user.id);
                    ctx.setCookies.push(cookie);
                    return {
                        __typename: 'AuthPayload',
                        user,
                        expiresAt
                    }
                } catch (e) {
                    return returnError('userAlreadyExists');
                }
            }
        });
        t.field("login", {
            type: "LoginResult",
            args: {
                username: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            async resolve(parent, { username, password }, ctx) {
                let user = null;
                try {
                    user = await ctx.prisma.user.findUnique({
                        where: {
                            username
                        }
                    });
                } catch (e) {
                    return returnError('invalidUser');
                }
                if (!user) return returnError('invalidUser');
                const passwordValid = await compare(password, user.password)
                if (!passwordValid) return returnError('invalidUser')

                const { cookie, expiresAt } = generateCookie(user.id);
                ctx.setCookies.push(cookie);
                return {
                    __typename: 'AuthPayload',
                    user,
                    expiresAt
                }
            }
        });
        t.field("logout", {
            type: "LogoutResult",
            resolve(parent, args, ctx: Context) {
                try {
                    const { cookie } = generateCookie(ctx.userId);
                    cookie.options.maxAge = 0;
                    ctx.setCookies.push(cookie)
                    return {
                        __typename: "LogoutSuccess",
                        message: "Success"
                    }
                } catch (e) {
                    return returnError("logoutFailed")
                }
            }

        });
        t.field('updateUser', {
            type: 'User',
            args: {
                name: stringArg(),
                username: stringArg(),
                email: stringArg(),
                password: stringArg(),
                profile_pic: stringArg()
            },
            async resolve(parent, { name, username, password, email, profile_pic }, ctx) {
                let hashedPassword;
                if (password) {
                    hashedPassword = await hash(password, 10);
                }
                let publicId = null;
                if (profile_pic) {
                    try {
                        const currentUser = await ctx.prisma.user.findFirst({ where: { id: ctx.userId } });
                        if (currentUser?.profile_pic) {
                            await deleteImages([currentUser?.profile_pic]);
                        }
                        const data = await getImageData(profile_pic)
                        publicId = data.public_id;
                    } catch (e) {
                        console.log(e)
                    }
                };
                const user = await ctx.prisma.user.update({
                    data: {
                        email: email || undefined,
                        name: name || undefined,
                        username: username || undefined,
                        profile_pic: publicId || undefined,
                        password: hashedPassword || undefined
                    },
                    where: { id: ctx.userId }
                });
                return user

            }
        });
    }
})