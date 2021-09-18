import { PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";
import { Context, cookie, generateCookieType, Token } from "../types";
import { APP_SECRET, errors, Errors, tokens } from "./constants";
import { sign, verify } from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { v2 } from "cloudinary";

export const prisma = new PrismaClient();
const pubsub = new PubSub();

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
  );
  return accessToken;
};
export const generateCookie = (userId: string): generateCookieType => {
  const accessToken = generateAccessToken(userId);
  const cookie: cookie = {
    name: "Token",
    value: accessToken,
    options: {
      httpOnly: true,
      maxAge: 86400,
      sameSite: "none",
      secure: true,
    },
  };
  const decodedToken = jwtDecode(accessToken);
  // @ts-ignore
  const expiresAt = decodedToken?.exp;
  return { cookie, expiresAt };
};

export const returnError = (error: keyof Errors) => {
  return errors[error];
};

export const createContext = (ctx: any): Context => {
  let userId: string;
  try {
    let Authorization = "";
    Authorization = ctx.req.cookies?.["Token"];
    const token = Authorization;

    const verifiedToken = verify(token, APP_SECRET) as Token;
    if (!verifiedToken.userId && verifiedToken.type !== tokens.access.name)
      userId = "";
    else userId = verifiedToken.userId;
  } catch (e) {
    userId = "";
  }
  return {
    ...ctx,
    prisma,
    pubsub,
    setCookies: new Array(),
    setHeaders: new Array(),
    userId,
  };
};

export const getImageData = async (file: string) => {
  const response = await v2.uploader
    .upload(file, { secure: true })
    .catch((e) => {
      throw new Error(e);
    });
  return response;
};

export const deleteImages = async (publicIds: string[]) => {
  await v2.api.delete_resources(publicIds).catch((e) => console.log(e));
};
