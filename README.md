# School Management Application with GraphQL and MongoDB

## Modules
- The application contains 2 modules: Lesson Module and Student Module
### Lesson Module
- LessonResolver (equivalent to LessonController but from GraphQL side - door for the application)
- LessonService
- LessonEntity: name, startDate, endDate, students (MongoDB for storage)

### Student Module
- StudentResolver
- StudentService
- StudentEntity: firstName, lastName (MongoDB for storage)

## Installation of GraphQL and tools
- `npm install graphql@14.6.0 graphql-tools apollo-server-express @nestjs/graphql`
- `import { GraphQLModule } from '@nestjs/graphql';` in the app.module.ts.
```ts
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true // to save the schema in memory and regenerated every time we started the NestJS application
    }),
  ],
})
```
- create Lesson module: nest g module lesson
- create Student module: nest g module student
## Define types for GraphQL for each modules
- For Lesson Module: create lesson.type.ts in the lesson folder
```ts
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
```
- NestJS GraphQL module can send the type base on the type we provide to the class property. But it is good idea to define the type explicitly, ex. `@Field(type => ID)`.

## GraphQL resolver
- create the `lesson.resolver.ts`
- add it to the `@Module`:
```ts
@Module({
    providers: [LessonResolver]
})
```
- add resolver to `lesson.resolver.ts`
```ts
import { Query, Resolver } from "@nestjs/graphql";
import { LessonType } from "./lesson.type";

@Resolver(of => LessonType)
export class LessonResolver {
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
}
```
- Now we can run GraphQL playground in our local machine: `http://localhost:3000/graphql`
- We can do a test in the interface:
```
# Write your query or mutation here
query {
  lesson {
    name
    startDate
  }
}
```
## TypeORM and MongoDB - Lesson Entity
- install: `npm install typeorm @nestjs/typeorm mongodb @types/mongodb`
- Update the app.module.ts to use typeorm and mongodb
```ts
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/school',
      synchronize: true,
      useUnifiedTopology: true,
      entities: []
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    LessonModule
  ],
})
```
- create lesson entity (lesson.entity.ts):
```ts
@Entity()
export class Lesson {
    @ObjectIdColumn() // not expose outside
    _id: string; // default id from mongodb 

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;
    
    @Column()
    startDate: string;

    @Column()
    endDate: string;
}
```
- And include the entity to app.module.ts, inside TypeOrmModule entities field:
```ts
entities: [Lesson]
```

#### LessonService and Lesson method
- create lesson service: `nest g service lesson --no-spec`
- createLesson method for creating a lesson:
```ts
@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>
    ) {}

    async createLesson(name, startDate, endDate): Promise<Lesson> {
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate
        });

        return this.lessonRepository.save(lesson);
    }
}
```

#### Creating Lesson GraphQL mutation
- add mutation method to LessonResolver for creating Lesson
```ts
@Mutation(returns => LessonType)
createLesson(
    @Args('name') name: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
) {
    return this.lessonService.createLesson(name, startDate, endDate);
}
```
- test in graphQL playground (ex. get name):
```
# Write your query or mutation here
mutation {
  createLesson(
    name: "Physics Class"
    startDate: "2020-03-28T18:00:00Z"
    endDate: "2020-03-28T18:30:00Z"
  ) {
    name
  }
}
```