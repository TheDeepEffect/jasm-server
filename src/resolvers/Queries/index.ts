import * as Post from "./Post";
import * as User from "./User";
import * as Like from "./Like";

export const Query = {
  ...Post,
  ...User,
  ...Like,
};
