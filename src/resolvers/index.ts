import * as Models from "./models";
import { Query } from "./Queries";
import { Mutation } from "./Mutations";
export const resolvers = {
    ...Models,
    Query,
    Mutation
}