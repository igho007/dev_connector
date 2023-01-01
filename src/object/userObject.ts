import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  userId: string;

  @Field()
  avatar: string;

  @Field()
  createdAt: string;
}
