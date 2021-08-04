
import { config } from 'dotenv'
config()

import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";
import { ALLOWED_URL, isDev } from "./utils/constants";
import { createContext } from "./utils/helpers";
import cors from "cors";
// for subscription
import express from "express";
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

const httpHeadersPlugin = require("apollo-server-plugin-http-headers");
var cookieParser = require('cookie-parser')

export async function startServer(PORT: string | number) {
    const corsOptions = {
        origin: ALLOWED_URL,
        credentials: true
    }
    const app = express();
    app.use(cors(corsOptions));
    // in order to get cookies in req
    app.use(cookieParser());
    app.use(express.urlencoded({
        extended: true
    }))
    const httpServer = createServer(app);

    const server = new ApolloServer({
        plugins: [httpHeadersPlugin],
        schema: schema,
        context: createContext,
        introspection: true,
        debug: isDev(),
    });

    await server.start();
    server.applyMiddleware({ app });

    const subscriptionServer = SubscriptionServer.create({
        schema,
        execute,
        subscribe
    }, {
        server: httpServer,
        path: server.graphqlPath
    });
    ['SIGINT', 'SIGTERM'].forEach(signal => {
        process.on(signal, () => subscriptionServer.close());
    });
    httpServer.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}/graphql`));
}