import { Injectable } from "@nestjs/common";
import { IUser } from "./user.interface";
import { users } from "./users";

@Injectable()
export class UserService {
    people = users 
    constructor() { }
    
    async get(id: string) : Promise<IUser | unknown> {
        return  this.people.find((user) => String(user._id) === id )
    }

    async getAll() : Promise<IUser[]> {
        return  this.people
    }

    async create(data : IUser) {
        const id = `${Date.now()}` 
        data._id = id 
        return this.people.push(data) 

    }

    async login(email : string , password : string)  {
       return this.people.find((user) => user.email === email && user.password === password)
    }
}