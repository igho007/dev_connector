import "reflect-metadata";
import "colors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { json } from "body-parser";
import cors from "cors";
import express, { Request } from "express";
import http from "http";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/HelloResolver";
import { PrismaClient } from "@prisma/client";
import { UserResolver } from "./resolvers/UserResolver";
import { verify } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

interface MyContext {
  token?: String;
}

const prisma = new PrismaClient();

const main = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer<MyContext>({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  app.use((req: Request, _, next) => {
    try {
      if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split("bearer ")[1];
        if (token) {
          const decodedToken = verify(token, "ighodalo");
          req.user = decodedToken;
        }
      }
    } catch {}
    next();
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        token: req.headers.token,
        req,
        res,
        prisma,
      }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`.blue.bold);
};

main()
  .catch((e) => console.log(`${e}`.red))
  .finally(async () => await prisma.$disconnect());
