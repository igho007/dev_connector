import { PrismaClient } from "@prisma/client";
import { Request } from "express";

interface User {
  name: string;
  email: string;
  userId: string;
}

export class Context {
  prisma: PrismaClient;
  req: Request;
  res: Response;
  user: User;
}
