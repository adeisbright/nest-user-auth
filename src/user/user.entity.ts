import { Entity, Column, PrimaryGeneratedColumn , Index } from "typeorm"; 

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    username: string;

    @Index({ unique: true })
    @Column()
    email: string; 

    @Column()
    password: string; 
}