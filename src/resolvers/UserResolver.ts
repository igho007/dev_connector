import { Context } from "./../types";
import { validateRegister } from "./../utils/validateError";
import { Register } from "./../dto/register";
import { User } from "./../object/userObject";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { v4 } from "uuid";
import { hash } from "bcrypt";
import { url } from "gravatar";
import { sign } from "jsonwebtoken";

const generateToken = (user: any) => {
  return sign(
    { name: user.name, email: user.email, userId: user.userId },
    "ighodalo",
    { expiresIn: "2h" }
  );
};

@Resolver()
export class UserResolver {
  @Query(() => String)
  async getUSers() {
    return "hello";
  }

  // create user
  @Mutation(() => User)
  async register(
    @Arg("register") { name, email, password, confirmPassword }: Register,
    @Ctx() { prisma }: Context
  ) {
    const { errors, valid } = validateRegister(
      name,
      email,
      password,
      confirmPassword
    );
    if (!valid) {
      throw new GraphQLError("Bad input", { extensions: { errors } });
    }

    // check if the user already exists
    try {
      let userByEmail = await prisma.user.findUnique({ where: { email } });
      if (userByEmail) {
        errors.email = "Email is taken";
        throw new GraphQLError("Bad Input", { extensions: { errors } });
      }
      const avatar = url(email, { s: "200", r: "pg", d: "mm" }, true);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: await hash(password, 12),
          createdAt: new Date().toDateString(),
          avatar,
          userId: v4(),
        },
      });

      const token = generateToken(user);
      return {
        ...user,
        token,
      };
    } catch (err) {
      throw err;
    }
  }
}
