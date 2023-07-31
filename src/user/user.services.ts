import { Injectable } from "@nestjs/common";
import { IUser } from "./user.interface";
import { users } from "./users";

@Injectable()
export class UserService {
    people = users 
    constructor() { }
    
    async get(id: string) : Promise<IUser | unknown> {
        return  this.people.find((user) => user._id === id )
    }

    async getAll() : Promise<IUser[]> {
        return  this.people
    }
}