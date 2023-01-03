import { GraphQLError } from "graphql";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ProfileInput } from "./../dto/profile";
import { Profile } from "./../object/profileObjects";
import { Context } from "./../types";

@Resolver()
export class ProfileResolver {
  @Query(() => String)
  async getProfile() {
    return "Hello profile";
  }

  @Mutation(() => Profile)
  async createOrUpdateProfile(
    @Arg("profile")
    {
      company,
      skills,
      status,
      location,
      website,
      bio,
      githubusername,
      facebook,
      youtube,
      twitter,
      linkedin,
    }: ProfileInput,
    @Ctx() { prisma, req }: Context
  ) {
    try {
      if (!req.user) throw new GraphQLError("User not allowed");
      let userInput = await prisma.user.findFirstOrThrow({
        where: { userId: req.user.userId },
      });

      // if (status === "" || skills === "")
      //   throw new GraphQLError("Bad Input", {
      //     extensions: { errors: "Skills or status is required" },
      //   });
      const profile = await prisma.profile.upsert({
        where: { id: userInput.id },
        update: {
          company,
          skills,
          status,
          location,
          bio,
          githubusername,
          website,
          socials: {
            upsert: {
              update: { facebook, linkedin, twitter, youtube },
              create: { facebook, linkedin, twitter, youtube },
            },
          },
        },
        create: {
          company,
          skills,
          status,
          location,
          bio,
          githubusername,
          website,
          userId: userInput.id,
          createdAt: new Date().toDateString(),
        },

        include: {
          user: true,
          socials: true,
        },
      });
      return profile;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Mutation(() => Profile)
  async createProfile(
    @Arg("profile")
    {
      company,
      skills,
      status,
      location,
      website,
      bio,
      githubusername,
      facebook,
      youtube,
      twitter,
      linkedin,
    }: ProfileInput,
    @Ctx() { prisma, req }: Context
  ) {
    try {
      if (!req.user) throw new GraphQLError("User not allowed");
      let userInput = await prisma.user.findFirstOrThrow({
        where: { userId: req.user.userId },
      });

      if (status === "" || skills === "")
        throw new GraphQLError("Bad Input", {
          extensions: { errors: "Skills or status is required" },
        });

      let myProfile = await prisma.profile.findFirst({
        where: { id: userInput.id },
      });

      console.log(myProfile);

      if (myProfile) {
        myProfile = await prisma.profile.update({
          where: { id: userInput.id },
          data: {
            status,
            bio,
            location,
            website,
            githubusername,
            company,
            skills: skills.split(",").map((skill: any) => skill.trim()),

            socials: {
              create: {
                facebook,
                twitter,
                linkedin,
                youtube,
              },
            },
          },
        });
        console.log(123);
        return myProfile;
      } else {
        console.log(4566);
        myProfile = await prisma.profile.create({
          data: {
            status,
            skills: skills.split(",").map((skill: any) => skill.trim()),
            createdAt: new Date().toDateString(),
            company,
            location,
            website,
            bio,
            email: userInput.email,
            githubusername,
            userId: userInput.id,
            socials: {
              create: {
                facebook,
                twitter,
                linkedin,
                youtube,
              },
            },
          },
          include: {
            user: true,
          },
        });
        console.log(myProfile);
        return myProfile;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
