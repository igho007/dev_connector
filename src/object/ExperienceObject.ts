import { Field, ObjectType } from "type-graphql";
@ObjectType()
export class Experience {
  @Field()
  company: string;
  @Field()
  location: string;
  @Field()
  title: string;
  @Field()
  from: string;
  @Field()
  to: string;
  @Field()
  current: boolean;
  @Field()
  createdAt: string;
}
