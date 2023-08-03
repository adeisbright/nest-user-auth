import { Module } from "@nestjs/common";
import { UserService } from "src/user/user.services";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";
import config from "src/config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";


@Module({
    imports: [
        UserModule, 
        JwtModule.register({
            global: true
        }), 
        ConfigModule.forRoot({
            load : [config]
        }), 
        CacheModule.register()
    ],
    providers: [
        UserService,
        AuthService, 
        {
            provide: APP_GUARD, 
            useClass : AuthGuard
        }, 
        ConfigService
    ],
    controllers: [AuthController], 
    exports : [AuthService] 
})

export class AuthModule { }