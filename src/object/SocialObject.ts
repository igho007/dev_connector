import { Field, ObjectType } from "type-graphql";
@ObjectType()
export class Social {
  @Field()
  youtube: string;
  @Field()
  facebook: string;
  @Field()
  twitter: string;
  @Field()
  linkedin: string;
}
