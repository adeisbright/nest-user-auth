import { Module } from "@nestjs/common";
import { UserService } from "./user.services";
import { UserController } from "./user.controller";
import { AuthService } from "src/auth/auth.service";
import { ConfigService } from "@nestjs/config";

@Module({
    providers: [UserService , AuthService , ConfigService], 
    controllers: [UserController],
    exports : [UserService]
})

export class UserModule {}