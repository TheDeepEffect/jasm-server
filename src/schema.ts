import { makeSchema } from "nexus";
import {join} from "path";
import * as allTypes from "./resolvers"

export const schema=makeSchema({
    types:[allTypes],
    sourceTypes: {
        modules: [
          {
            module: require.resolve('.prisma/client/index.d.ts'),
            alias: 'prisma',
          },
        ],
      },
      contextType: {
        module: join(__dirname,"..","src", "types.ts"),
        export: 'Context',
      },
      outputs: {
        typegen: join(__dirname,"..","src", 'generated', 'index.d.ts'),
        schema: join(__dirname, "..","src",'generated', 'schema.graphql'),
      },

})