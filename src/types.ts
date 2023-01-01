import { PrismaClient } from "@prisma/client";
import { Request } from "express";

export class Context {
  prisma: PrismaClient;
  req: Request;
  res: Response;
}
