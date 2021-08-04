"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
var nexus_1 = require("nexus");
var path_1 = require("path");
var allTypes = __importStar(require("./resolvers"));
exports.schema = nexus_1.makeSchema({
    types: [allTypes],
    sourceTypes: {
        modules: [
            {
                module: require.resolve('.prisma/client/index.d.ts'),
                alias: 'prisma',
            },
        ],
    },
    contextType: {
        module: path_1.join(__dirname, "..", "src", "types.ts"),
        export: 'Context',
    },
    outputs: {
        typegen: path_1.join(__dirname, "..", "src", 'generated', 'index.d.ts'),
        schema: path_1.join(__dirname, "..", "src", 'generated', 'schema.graphql'),
    },
});
//# sourceMappingURL=schema.js.map