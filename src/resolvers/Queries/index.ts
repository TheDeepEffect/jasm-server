import * as Post from "./Post";
import * as User from "./User";
import * as Signature from "./Signature";
export const Query = {
    ...Post,
    ...User,
    ...Signature,
}