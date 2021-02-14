import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService
    ) {}
    // create query
    @Query(of => LessonType)
    lesson() {
        return {
            id: 'adsadfa2dsa',
            name: 'Physics Class',
            startDate: (new Date()).toISOString(),
            endDate: (new Date()).toISOString(),
        }
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('name') name: string,
        @Args('startDate') startDate: string,
        @Args('endDate') endDate: string,
    ) {
        return this.lessonService.createLesson(name, startDate, endDate);
    }
}
