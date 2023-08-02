import { Controller, Post, UsePipes , Body, InternalServerErrorException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { ValidateUserPipe } from "src/common/middleware/validate-user-body";
import { UserDTO } from "src/user/user.dto";
import { UserService } from "src/user/user.services";
import { AuthService } from "./auth.service";

@Controller("auth")

export class AuthController {
    constructor(
        private userService: UserService, 
        private authService : AuthService
    ) { } 

    @Post("/sign-up")
    @UsePipes(ValidateUserPipe)
    async handleRegistration(
        @Body() body : UserDTO
    ) {
        const user = await this.userService.create(body) 
        if (!user) {
            throw new InternalServerErrorException("Server Error")
        }
        return {
            data: user,
            success: true,
            message: "Registration Successful", 
            statusCode : HttpStatus.CREATED
        }
    }

    @Post("login")
    async handleLogin(
        @Body() body : Record<string,any>
    ) {
        const {email , password} = body 
        const user = await this.authService.generateAuthToken(email, password)
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

    @Post("logout")
    async handleLogout() {
        return "Logout  not implemented yet"
    }
}