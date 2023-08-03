import { CanActivate, ExecutionContext , Injectable, UnauthorizedException , Inject } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { IS_ANON_KEY } from "./anon";
import { ConfigService } from "@nestjs/config";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable() 
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService, 
        private reflector: Reflector, 
        private configService: ConfigService, 
         @Inject(CACHE_MANAGER)private cacheManager: Cache, 
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

        const cacheKey = `blacklist:${token}`
        const isBlackListedToken = await this.cacheManager.get(cacheKey) 
        if (isBlackListedToken) {
            throw new UnauthorizedException("Session Expired : Login Again")
        } 

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret : this.configService.get<string>('jwt.secret')
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