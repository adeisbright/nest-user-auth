import { Module } from "@nestjs/common";
import { UserService } from "./user.services";
import { UserController } from "./user.controller";
import { users } from "./users";

@Module({
    providers: [UserService], 
    controllers : [UserController]
})

export class UserModule {}