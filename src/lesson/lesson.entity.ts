import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";


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