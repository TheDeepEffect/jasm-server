import * as Models from "./models";
import { Query } from "./Queries";
import { Mutation } from "./Mutations";
import { Subscription } from "./Subscriptions";
export const resolvers = {
    ...Models,
    Query,
    Mutation,
    Subscription
}