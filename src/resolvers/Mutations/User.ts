import { extendType, nonNull, stringArg } from "nexus";
import { compare, hash } from "bcrypt";
import { generateCookie, returnError } from "../../utils/helpers";
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
            },
            async resolve(parent, { name, username, password, email }, ctx) {
                try {
                    const hashedPassword = await hash(password, 10);
                    const user = await ctx.prisma.user.create({
                        data: {
                            name, username, email, password: hashedPassword
                        }
                    });
                    const cookie = generateCookie(user.id);
                    ctx.setCookies.push(cookie);
                    return {
                        __typename: 'AuthPayload',
                        user
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

                const cookie = generateCookie(user.id);
                ctx.setCookies.push(cookie);
                return {
                    __typename: 'AuthPayload',
                    user
                }
            }
        });
        t.field("logout", {
            type: "LogoutResult",
            resolve(parent, args, ctx: Context) {
                try {
                    //  @ts-ignore
                    ctx.res.clearCookie("Token")
                    return {
                        __typename: "LogoutSuccess",
                        message: "Success"
                    }
                } catch (e) {
                    return returnError("logoutFailed")
                }
            }

        })
    }
})