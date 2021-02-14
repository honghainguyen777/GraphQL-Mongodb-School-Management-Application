import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('Lesson') // Object type named Lesson
export class LessonType {
    @Field(type => ID) // ID is type shipped by GraphQL
    id: string;

    @Field()
    name: string;

    @Field()
    startDate: string;

    @Field()
    endDate: string;
}