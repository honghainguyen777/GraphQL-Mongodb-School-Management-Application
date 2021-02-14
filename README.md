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