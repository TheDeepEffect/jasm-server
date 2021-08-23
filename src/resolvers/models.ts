import { asNexusMethod, objectType, unionType } from "nexus";
import { DateTimeResolver } from "graphql-scalars";
import { resolve } from "path/posix";
/* tslint:disable */
export const GQLDate = asNexusMethod(DateTimeResolver, "date");

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.id("id");
    t.string("url");
    t.date("createdAt");
    t.date("updatedAt");
    t.string("description");
    t.boolean("isPrivate", {
      resolve(post, _, ctx) {
        return post.isPrivate
      }
    });
    t.field("author", {
      type: "User",
      async resolve(post, _, ctx) {
        return await ctx.prisma.post
          .findFirst({
            where: {
              id: post.id,
            },
          })
          .author();
      },
    });
    t.list.field("likes", {
      type: "Like",
      async resolve(post, _, ctx) {
        return await ctx.prisma.post
          .findFirst({
            where: { id: post.id },
          })
          .likes();
      },
    });
    t.list.field("comments", {
      type: 'Comment',
      async resolve(post, _, ctx) {
        return await ctx.prisma.post.findFirst({ where: { id: post.id } }).comments();
      }
    });
  },
});

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.string("name");
    t.string("email");
    t.string("username");
    t.string("profile_pic");
    t.date("createdAt");
    t.list.field("posts", {
      type: "Post",
      async resolve(user, _, ctx) {
        return await ctx.prisma.user.findFirst({ where: { id: user.id } }).posts();
      },
    });
    t.list.field("comments", {
      type: 'Comment',
      async resolve(user, _, ctx) {
        return await ctx.prisma.user.findFirst({ where: { id: user.id } }).comments();
      }
    });
    t.list.field("likes", {
      type: 'Like',
      async resolve(user, _, ctx) {
        return await ctx.prisma.user.findFirst({ where: { id: user.id } }).likedPosts();
      }
    })
  },
});

export const Like = objectType({
  name: "Like",
  definition(t) {
    t.id("id");
    t.field("post", {
      type: "Post",
      async resolve(like, _, ctx) {
        return await ctx.prisma.like.findFirst({ where: { id: like.id } }).post();
      },
    });
    t.field("user", {
      type: "User",
      async resolve(like, _, ctx) {
        return await ctx.prisma.like.findFirst({ where: { id: like.id } }).user();
      },
    });
  },
});
export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.id("id");
    t.string("content");
    t.field("post", {
      type: "Post",
      async resolve(comment, _, ctx) {
        return await ctx.prisma.comment.findFirst({ where: { id: comment.id } }).post();
      },
    });
    t.field("user", {
      type: "User",
      async resolve(comment, _, ctx) {
        return await ctx.prisma.comment.findFirst({ where: { id: comment.id } }).user();
      },
    });
  }
});
export const Follow = objectType({
  name: "Follow",
  definition(t) {
    t.id("id");
    t.field("followToUser", {
      type: "User",
      async resolve(follow, _, ctx) {
        return await ctx.prisma.follow.findFirst({ where: { id: follow.id } }).followToUser()
      }
    })
    t.field("followByUser", {
      type: "User",
      async resolve(follow, _, ctx) {
        return await ctx.prisma.follow.findFirst({ where: { id: follow.id } }).followByUser()
      }
    })
  }
})

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.field('user', { type: 'User' })
  },
})

export const InvalidUserError = objectType({
  name: 'InvalidUser',
  definition(t) {
    t.nonNull.string("message");
  }
})
export const UserAlreadyExistsError = objectType({
  name: 'UserAlreadyExists',
  definition(t) {
    t.nonNull.string("message");
  }
})
export const LoginResult = unionType({
  name: 'LoginResult',
  definition(t) {
    t.members('AuthPayload', "InvalidUser")
  },
  resolveType(t) {
    // @ts-ignore
    return t.__typename
  }
})

export const SignupResult = unionType({
  name: 'SignupResult',
  definition(t) {
    t.members('AuthPayload', 'UserAlreadyExists')
  },
  resolveType(t) {
    // @ts-ignore
    return t.__typename
  },
});

export const logoutFailedError = objectType({
  name: 'LogoutFailed',
  definition(t) {
    t.nonNull.string("message");
  }
})
export const LogoutSuccess = objectType({
  name: "LogoutSuccess",
  definition(t) {
    t.nonNull.string("message");
  }
})

export const LogoutResult = unionType({
  name: "LogoutResult",
  definition(t) {
    t.members("LogoutSuccess", "LogoutFailed")
  },
  resolveType(t) {
    // @ts-ignore
    return t.__typename
  }
})