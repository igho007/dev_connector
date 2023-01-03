import { Field, InputType } from "type-graphql";
@InputType()
export class ProfileInput {
  @Field()
  company?: string;
  @Field()
  website?: string;
  @Field()
  location?: string;
  @Field()
  status: string;
  @Field()
  youtube: string;
  @Field()
  facebook: string;
  @Field()
  twitter: string;
  @Field()
  linkedin: string;
  @Field()
  skills: string;
  @Field()
  bio?: string;
  @Field()
  githubusername?: string;
}
