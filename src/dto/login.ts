import { Field, InputType } from "type-graphql";

@InputType()
export class Login {
  @Field()
  email: string;
  @Field()
  password: string;
}
