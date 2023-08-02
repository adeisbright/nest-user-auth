import { Module } from "@nestjs/common";
import { UserService } from "./user.services";
import { UserController } from "./user.controller";
import { AuthService } from "src/auth/auth.service";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ] , 
    providers: [UserService , AuthService , ConfigService], 
    controllers: [UserController],
    exports : [UserService , TypeOrmModule]
})

export class UserModule {}