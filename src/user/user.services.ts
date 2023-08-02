import { Injectable } from "@nestjs/common";
import { IUser } from "./user.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private userRepository : Repository<User>
    ) { }
    
    async get(id:number) : Promise<IUser | unknown> {
        const user = await this.userRepository.findOneBy({ id }) 
        if (!user) return false 
        const {password , ...profile} = user 
        return profile 
    }

    async getAll() : Promise<IUser[]> {
        return  this.userRepository.find()
    }

   
    async save(data : IUser) {
        const user = await this.userRepository.save(data) 
        const {password , ...profile} = user 
        return profile
    }

    async findByEmail(email : string)  {
       return this.userRepository.findOneBy({email})
    }
}