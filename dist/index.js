"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("colors");
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const type_graphql_1 = require("type-graphql");
const HelloResolver_1 = require("./resolvers/HelloResolver");
const client_1 = require("@prisma/client");
const UserResolver_1 = require("./resolvers/UserResolver");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma = new client_1.PrismaClient();
const main = async () => {
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    const server = new server_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [HelloResolver_1.HelloResolver, UserResolver_1.UserResolver],
            validate: false,
        }),
        plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
    });
    app.use((req, _, next) => {
        try {
            if (req.headers && req.headers.authorization) {
                const token = req.headers.authorization.split("bearer ")[1];
                if (token) {
                    const decodedToken = (0, jsonwebtoken_1.verify)(token, "ighodalo");
                    req.user = decodedToken;
                }
            }
        }
        catch (_a) { }
        next();
    });
    await server.start();
    app.use("/graphql", (0, cors_1.default)(), (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(server, {
        context: async ({ req, res }) => ({
            token: req.headers.token,
            req,
            res,
            prisma,
        }),
    }));
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/graphql`.blue.bold);
};
main()
    .catch((e) => console.log(`${e}`.red))
    .finally(async () => await prisma.$disconnect());
//# sourceMappingURL=index.js.map