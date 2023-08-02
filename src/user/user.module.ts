import { Module } from "@nestjs/common";
import { UserService } from "./user.services";
import { UserController } from "./user.controller";
import { users } from "./users";
import { AuthService } from "src/auth/auth.service";

@Module({
    providers: [UserService , AuthService], 
    controllers: [UserController],
    exports : [UserService]
})

export class UserModule {}