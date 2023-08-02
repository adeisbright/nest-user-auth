import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.services";
import { JwtService } from "@nestjs/jwt";


@Injectable() 
export class AuthService {
    constructor(
        private userService: UserService ,
        private jwtService : JwtService
    ) { }
    
    async generateAuthToken(
        email: string,
        passwords : string 
    ) {
        const user = await this.userService.login(email, passwords) 
        if (!user) {
            return {
                error: true, 
                message: "User not found",
                data: {
                    profile: "", 
                    token : ""
                }
            }
        }
        const {password , ...profile} = user
        const payload = {
            sub: user._id, 
            name : user.username
        }

        const token = await this.jwtService.signAsync(payload)

        return {
            error :  false,
            message: "Login successful",
            data: {
                token,
                profile 
            }
        }

    }
}