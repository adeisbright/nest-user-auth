import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.services";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import* as  bcrypt from "bcrypt"

@Injectable() 
export class AuthService {
    constructor(
        private userService: UserService ,
        private jwtService: JwtService, 
        private configService : ConfigService
    ) { }
    
    async generateAuthToken(email: string,userPassword : string ) {
        const user = await this.userService.findByEmail(email) 
        if (!user) {
            return {
                error: true, 
                message: "Invalid Login Credentials"
            }
        }

        const { password, ...profile } = user 
        
        const CORRECT_PASSWORD  = await bcrypt.compare(userPassword, password) 
        if (!CORRECT_PASSWORD) {
             return {
                error: true, 
                message: "Invalid Login Credentials"
            }
        }

        const payload = {
            sub: user.id, 
            name : user.username
        }

        const token = await this.jwtService.signAsync(payload , {secret : this.configService.get<string>('jwt.secret')})

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