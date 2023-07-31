import { Controller, Post, UsePipes , Body, InternalServerErrorException, HttpStatus } from "@nestjs/common";
import { ValidateUserPipe } from "src/common/middleware/validate-user-body";
import { UserDTO } from "src/user/user.dto";
import { UserService } from "src/user/user.services";

@Controller("auth")

export class AuthController {
    constructor(
        private userService: UserService
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
    async handleLogin() {
        return "Login not implemented yet"
    }

    @Post("logout")
    async handleLogout() {
        return "Logout  not implemented yet"
    }
}