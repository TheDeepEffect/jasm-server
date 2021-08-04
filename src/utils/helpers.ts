import { PrismaClient } from "@prisma/client"
import { PubSub } from "graphql-subscriptions";
import { Context, cookie, Token } from "../types";
import { APP_SECRET, errors, Errors, tokens } from "./constants";
export const prisma = new PrismaClient()
const pubsub = new PubSub()
import { sign, verify } from 'jsonwebtoken';
import { CookieOptions } from "express";


export const generateAccessToken = (userId: string) => {
  const accessToken = sign(
    {
      userId,
      type: tokens.access.name,
      timestamp: Date.now(),
    },
    APP_SECRET,
    {
      expiresIn: tokens.access.expiry,
    }
  )
  return accessToken
};
export const generateCookie = (userId: string): cookie => {
  const accessToken = generateAccessToken(userId);
  return {
    name: "Token",
    value: accessToken,
    options: {
      httpOnly: true,
      maxAge: 43200,
      sameSite: "none",
      secure: true
    }
  }
}

export const returnError = (error: keyof Errors) => {
  return errors[error]
}

export const createContext = (ctx: any): Context => {
  let userId: string;
  try {
    let Authorization = ''
    try {
      // For queries and mutations
      Authorization = ctx.req.cookies?.['Token'];
    } catch (e) {
      // specifically for subscriptions as the above will fail
      // TODO : WS cookie setup here
      Authorization = ctx?.connection?.context?.Authorization
    }
    const token = Authorization
    const verifiedToken = verify(token, APP_SECRET) as Token
    if (!verifiedToken.userId && verifiedToken.type !== tokens.access.name)
      userId = ""
    else userId = verifiedToken.userId
  } catch (e) {
    userId = ""
  }
  return {
    ...ctx,
    prisma,
    pubsub,
    setCookies: new Array(),
    setHeaders: new Array(),
    userId
  }
}