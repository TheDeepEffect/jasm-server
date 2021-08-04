import { asNexusMethod, objectType, unionType } from "nexus";
import { DateTimeResolver } from "graphql-scalars";
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
    t.field("author", {
      type: "User",
      resolve(post, _, ctx) {
        return ctx.prisma.post
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
      resolve(post, _, ctx) {
        return ctx.prisma.post
          .findFirst({
            where: { id: post.id },
          })
          .likes();
      },
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
    t.date("createdAt");
    t.list.field("posts", {
      type: "Post",
      resolve(user, _, ctx) {
        return ctx.prisma.user.findFirst({ where: { id: user.id } }).posts();
      },
    });
    t.list.field("comments", {
      type: 'Comment',
      resolve(user, _, ctx) {
        return ctx.prisma.user.findFirst({ where: { id: user.id } }).comments();
      }
    });
    t.list.field("likes", {
      type: 'Like',
      resolve(user, _, ctx) {
        return ctx.prisma.user.findFirst({ where: { id: user.id } }).likedPosts();
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
      resolve(like, _, ctx) {
        return ctx.prisma.like.findFirst({ where: { id: like.id } }).post();
      },
    });
    t.field("user", {
      type: "User",
      resolve(like, _, ctx) {
        return ctx.prisma.like.findFirst({ where: { id: like.id } }).user();
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
      resolve(comment, _, ctx) {
        return ctx.prisma.comment.findFirst({ where: { id: comment.id } }).post();
      },
    });
    t.field("user", {
      type: "User",
      resolve(comment, _, ctx) {
        return ctx.prisma.comment.findFirst({ where: { id: comment.id } }).user();
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
      resolve(follow, _, ctx) {
        return ctx.prisma.follow.findFirst({ where: { id: follow.id } }).followToUser()
      }
    })
    t.field("followByUser", {
      type: "User",
      resolve(follow, _, ctx) {
        return ctx.prisma.follow.findFirst({ where: { id: follow.id } }).followByUser()
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
})