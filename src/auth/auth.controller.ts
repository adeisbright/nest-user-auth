import {
    Controller,
    Post,
    UsePipes,
    Body,
    InternalServerErrorException,
    HttpStatus,
    UnauthorizedException,
    BadRequestException, 
    Req, 
    Inject,
    Get
} from "@nestjs/common";
import { Request } from "express";
import { ValidateUserPipe } from "src/common/middleware/validate-user-body";
import { UserDTO } from "src/user/user.dto";
import { UserService } from "src/user/user.services";
import { AuthService } from "./auth.service";
import { PUBLIC } from "./anon";
import * as bcrypt from "bcrypt" 
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { ConfigService } from "@nestjs/config";

@Controller("auth")

export class AuthController {
    constructor(
        private userService: UserService, 
        private authService: AuthService,
        private configService : ConfigService , 
        @Inject(CACHE_MANAGER)private cacheManager: Cache, 
    ) { } 

    @PUBLIC() 
    @Post("/sign-up")
    @UsePipes(ValidateUserPipe)
    async handleRegistration(
        @Body() body : UserDTO
    ) {
        const { password, email } = body  
        
        const isUser = await this.userService.findByEmail(email) 
        if (isUser) {
            throw new BadRequestException("A user with the email you provided already exists")
        }
        const salt = await bcrypt.genSalt() 
        const hashPassword = await bcrypt.hash(password, salt) 
        
        body.password = hashPassword 
        const user = await this.userService.save(body) 
        if (!user) {
            throw new InternalServerErrorException("Server Error")
        }
        return {
            data: user,
            success: true,
            message: "Registration Successful", 
            statusCode: HttpStatus.CREATED
        }
    }

    @PUBLIC()
    @Post("login")
    async handleLogin(
        @Body() body : Record<string,any>
    ) {
        const {email , password} = body 
        const user = await this.authService.generateAuthToken(email , password)
        if (user.error) {
            throw new UnauthorizedException("Invalid Credentials")
        }

        return {
            message: user.message, 
            statusCode: HttpStatus.OK, 
            data:  user.data,
            success : true
        }
    }


    @Get("logout")
    async handleLogout(
        @Req() req : Request
    ) {
        const token = req.headers.authorization?.split(" ")[1] 
        await this.cacheManager.set(`blacklist:${token}` , token , this.configService.get('jwt.expires'))
        return {
            message: "Logged out successfully",
            success: true, 
            data: {}, 
            statusCode : HttpStatus.OK
        }
    }
}