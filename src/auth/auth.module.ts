import { Module } from "@nestjs/common";
import { UserService } from "src/user/user.services";
import { AuthController } from "./auth.controller";

@Module({
    imports: [],
    providers: [UserService],
    controllers: [AuthController]
})

export class AuthModule { }