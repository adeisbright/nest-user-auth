import { Controller, Post } from "@nestjs/common";
import { UserService } from "src/user/user.services";

@Controller("auth")

export class AuthController {
    constructor(
        private userService: UserService
    ) { } 

    @Post("/sign-up")
    async handleRegistration() {
        return "Sign up not implemented yet"
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