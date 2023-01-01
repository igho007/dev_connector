import { Field, InputType } from "type-graphql";

@InputType()
export class Register {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  confirmPassword: string;
}
