import { User } from "./userObject";
import { Social } from "./SocialObject";
import { Education } from "./EducationObject";
import { Experience } from "./ExperienceObject";
import { Field, ObjectType } from "type-graphql";
@ObjectType()
export class Profile {
  @Field()
  company: string;
  @Field(() => User, { nullable: true })
  user: { name: string; email: string; avatar: string };
  @Field()
  website?: string;
  @Field()
  bio?: string;
  @Field()
  githubusername?: string;
  @Field()
  location?: string;
  @Field()
  status: string;
  @Field(() => [String])
  skills: string;
  @Field()
  createdAt: string;
  @Field(() => [Experience])
  experience: Experience[];
  @Field(() => [Education])
  education: Education[];
  @Field()
  socials?: Social;
}
