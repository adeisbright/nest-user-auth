import { CanActivate, ExecutionContext , Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { IS_ANON_KEY } from "./anon";
import config from "src/config";

@Injectable() 
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService, 
        private reflector : Reflector
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean>{

        const isAnon = this.reflector.getAllAndOverride<boolean>(IS_ANON_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isAnon) return true 
        
        const request = context.switchToHttp().getRequest() 
        const token = this.extractTokenFromHeader(request) 

        if (!token) {
            throw new UnauthorizedException("Provide authorization token")
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret : config().jwt.secret
            })
            request["user"] = payload
            return true 
        } catch (error) {
            throw new UnauthorizedException(error.message)
        }
    }

    private extractTokenFromHeader(request : Request) : string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [] 
        return type === "Bearer" ? token : undefined 
    }
}