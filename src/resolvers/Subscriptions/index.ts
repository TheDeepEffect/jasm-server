import * as Post from "./Post";
import * as Comment from "./Comment";
import * as Like from "./Like";
import * as Follow from "./Follow";

export const Subscription = {
    ...Post,
    ...Like,
    ...Comment,
    ...Follow
}