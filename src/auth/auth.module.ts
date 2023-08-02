import { Module } from "@nestjs/common";
import { UserService } from "src/user/user.services";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        UserModule, 
        JwtModule.register({
            global: true, 
            secret: "leke",
            signOptions: {
                expiresIn : "1800s"
            }
        })
    ],
    providers: [UserService , AuthService],
    controllers: [AuthController], 
    exports : [AuthService] 
})

export class AuthModule { }