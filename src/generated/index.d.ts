/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type * as prisma from "./../../node_modules/.prisma/client/index"
import type { Context } from "./../types"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    expiresAt?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Comment: prisma.Comment;
  Follow: prisma.Follow;
  InvalidUser: { // root type
    message: string; // String!
  }
  Like: prisma.Like;
  LogoutFailed: { // root type
    message: string; // String!
  }
  LogoutSuccess: { // root type
    message: string; // String!
  }
  Mutation: {};
  Post: prisma.Post;
  Query: {};
  Subscription: {};
  User: prisma.User;
  UserAlreadyExists: { // root type
    message: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
  LoginResult: NexusGenRootTypes['AuthPayload'] | NexusGenRootTypes['InvalidUser'];
  LogoutResult: NexusGenRootTypes['LogoutFailed'] | NexusGenRootTypes['LogoutSuccess'];
  SignupResult: NexusGenRootTypes['AuthPayload'] | NexusGenRootTypes['UserAlreadyExists'];
}

export type NexusGenRootTypes = NexusGenObjects & NexusGenUnions

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    expiresAt: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Comment: { // field return type
    content: string | null; // String
    id: string | null; // ID
    post: NexusGenRootTypes['Post'] | null; // Post
    user: NexusGenRootTypes['User'] | null; // User
  }
  Follow: { // field return type
    followByUser: NexusGenRootTypes['User'] | null; // User
    followToUser: NexusGenRootTypes['User'] | null; // User
    id: string | null; // ID
  }
  InvalidUser: { // field return type
    message: string; // String!
  }
  Like: { // field return type
    id: string | null; // ID
    post: NexusGenRootTypes['Post'] | null; // Post
    user: NexusGenRootTypes['User'] | null; // User
  }
  LogoutFailed: { // field return type
    message: string; // String!
  }
  LogoutSuccess: { // field return type
    message: string; // String!
  }
  Mutation: { // field return type
    addComment: NexusGenRootTypes['Comment'] | null; // Comment
    createPost: NexusGenRootTypes['Post'] | null; // Post
    deleteComment: NexusGenRootTypes['Comment'] | null; // Comment
    deletePost: NexusGenRootTypes['Post'] | null; // Post
    follow: NexusGenRootTypes['Follow'] | null; // Follow
    like: NexusGenRootTypes['Like'] | null; // Like
    login: NexusGenRootTypes['LoginResult'] | null; // LoginResult
    logout: NexusGenRootTypes['LogoutResult'] | null; // LogoutResult
    signup: NexusGenRootTypes['SignupResult'] | null; // SignupResult
    unfollow: NexusGenRootTypes['Follow'] | null; // Follow
    unlike: NexusGenRootTypes['Like'] | null; // Like
    updateComment: NexusGenRootTypes['Comment'] | null; // Comment
    updatePost: NexusGenRootTypes['Post'] | null; // Post
    updateUser: NexusGenRootTypes['User'] | null; // User
  }
  Post: { // field return type
    author: NexusGenRootTypes['User'] | null; // User
    comments: Array<NexusGenRootTypes['Comment'] | null> | null; // [Comment]
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    description: string | null; // String
    id: string | null; // ID
    isPrivate: boolean | null; // Boolean
    likes: Array<NexusGenRootTypes['Like'] | null> | null; // [Like]
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    url: string | null; // String
  }
  Query: { // field return type
    feed: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    post: NexusGenRootTypes['Post'] | null; // Post
    users: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  Subscription: { // field return type
    latestComment: NexusGenRootTypes['Comment'] | null; // Comment
    latestLike: NexusGenRootTypes['Like'] | null; // Like
    latestPost: NexusGenRootTypes['Post'] | null; // Post
    newFollow: NexusGenRootTypes['Follow'] | null; // Follow
  }
  User: { // field return type
    comments: Array<NexusGenRootTypes['Comment'] | null> | null; // [Comment]
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    email: string | null; // String
    followers: Array<NexusGenRootTypes['Follow'] | null> | null; // [Follow]
    following: Array<NexusGenRootTypes['Follow'] | null> | null; // [Follow]
    id: string | null; // ID
    likes: Array<NexusGenRootTypes['Like'] | null> | null; // [Like]
    name: string | null; // String
    posts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    profile_pic: string | null; // String
    username: string | null; // String
  }
  UserAlreadyExists: { // field return type
    message: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    expiresAt: 'String'
    user: 'User'
  }
  Comment: { // field return type name
    content: 'String'
    id: 'ID'
    post: 'Post'
    user: 'User'
  }
  Follow: { // field return type name
    followByUser: 'User'
    followToUser: 'User'
    id: 'ID'
  }
  InvalidUser: { // field return type name
    message: 'String'
  }
  Like: { // field return type name
    id: 'ID'
    post: 'Post'
    user: 'User'
  }
  LogoutFailed: { // field return type name
    message: 'String'
  }
  LogoutSuccess: { // field return type name
    message: 'String'
  }
  Mutation: { // field return type name
    addComment: 'Comment'
    createPost: 'Post'
    deleteComment: 'Comment'
    deletePost: 'Post'
    follow: 'Follow'
    like: 'Like'
    login: 'LoginResult'
    logout: 'LogoutResult'
    signup: 'SignupResult'
    unfollow: 'Follow'
    unlike: 'Like'
    updateComment: 'Comment'
    updatePost: 'Post'
    updateUser: 'User'
  }
  Post: { // field return type name
    author: 'User'
    comments: 'Comment'
    createdAt: 'DateTime'
    description: 'String'
    id: 'ID'
    isPrivate: 'Boolean'
    likes: 'Like'
    updatedAt: 'DateTime'
    url: 'String'
  }
  Query: { // field return type name
    feed: 'Post'
    post: 'Post'
    users: 'User'
  }
  Subscription: { // field return type name
    latestComment: 'Comment'
    latestLike: 'Like'
    latestPost: 'Post'
    newFollow: 'Follow'
  }
  User: { // field return type name
    comments: 'Comment'
    createdAt: 'DateTime'
    email: 'String'
    followers: 'Follow'
    following: 'Follow'
    id: 'ID'
    likes: 'Like'
    name: 'String'
    posts: 'Post'
    profile_pic: 'String'
    username: 'String'
  }
  UserAlreadyExists: { // field return type name
    message: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addComment: { // args
      content: string; // String!
      postId: string; // String!
    }
    createPost: { // args
      description?: string | null; // String
      isPrivate?: boolean | null; // Boolean
      url: string; // String!
    }
    deleteComment: { // args
      id: string; // String!
    }
    deletePost: { // args
      id: string; // String!
    }
    follow: { // args
      userToId: string; // String!
    }
    like: { // args
      postId: string; // String!
    }
    login: { // args
      password: string; // String!
      username: string; // String!
    }
    signup: { // args
      email: string; // String!
      name: string; // String!
      password: string; // String!
      profile_pic?: string | null; // String
      username: string; // String!
    }
    unfollow: { // args
      id: string; // String!
    }
    unlike: { // args
      postId: string; // String!
    }
    updateComment: { // args
      content: string; // String!
      id: string; // String!
    }
    updatePost: { // args
      description?: string | null; // String
      id: string; // String!
      isPrivate?: boolean | null; // Boolean
      url: string; // String!
    }
    updateUser: { // args
      email?: string | null; // String
      name?: string | null; // String
      password?: string | null; // String
      profile_pic?: string | null; // String
      username?: string | null; // String
    }
  }
  Query: {
    feed: { // args
      skip?: number | null; // Int
      take?: number | null; // Int
    }
    post: { // args
      id: string; // String!
    }
    users: { // args
      filter?: string | null; // String
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  LoginResult: "AuthPayload" | "InvalidUser"
  LogoutResult: "LogoutFailed" | "LogoutSuccess"
  SignupResult: "AuthPayload" | "UserAlreadyExists"
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = keyof NexusGenUnions;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = "LoginResult" | "LogoutResult" | "SignupResult";

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}