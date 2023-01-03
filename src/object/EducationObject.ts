import { Field, ObjectType } from "type-graphql";
@ObjectType()
export class Education {
  @Field()
  school: string;
  @Field()
  degree: string;
  @Field()
  fieldsofstudy: string;
  @Field()
  from: string;
  @Field()
  to: string;
  @Field()
  current: boolean;
  @Field()
  createdAt: string;
}
