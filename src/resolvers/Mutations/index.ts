import * as Users from "./User";
import * as Posts from "./Post";
import * as Follow from "./Follow";
import * as Like from "./Like";
import * as Comment from "./Comment";

export const Mutation = {
    ...Users,
    ...Posts,
    ...Follow,
    ...Like,
    ...Comment,
}