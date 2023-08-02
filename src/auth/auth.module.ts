import { Module } from "@nestjs/common";
import { UserService } from "src/user/user.services";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";
import config from "src/config";
@Module({
    imports: [
        UserModule, 
        JwtModule.register({
            global: true, 
            secret: config().jwt.secret,
            signOptions: {
                expiresIn : config().jwt.expires
            }
        })
    ],
    providers: [
        UserService,
        AuthService, 
        {
            provide: APP_GUARD, 
            useClass : AuthGuard
        }
    ],
    controllers: [AuthController], 
    exports : [AuthService] 
})

export class AuthModule { }