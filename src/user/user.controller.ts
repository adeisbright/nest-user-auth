import { Controller , Get, HttpStatus, NotFoundException, Param, ParseIntPipe, UseGuards , Inject} from "@nestjs/common";
import { UserService } from "./user.services";
import { AuthGuard } from "src/auth/auth.guard";
import { PUBLIC } from "src/auth/anon";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Controller("users") 

export class UserController {
    constructor(
        @Inject(CACHE_MANAGER)private cacheManager: Cache, 
        private userService : UserService
    ) { }
    
    @PUBLIC()
    @Get()
    async getUsers() {
        const users = await this.cacheManager.get("users") 
        if (users) {
            console.log("Users dey") 
            console.log(users)
        } else {
            console.log("no users")
        }
        const user = await this.userService.getAll()
        const result = await this.cacheManager.set("users", JSON.stringify(user)) 
        console.log(result)
        return {
            message: "Users retrieved",
            success: true,
            data: user,
            statusCode : HttpStatus.OK
        }
    }

    @UseGuards(AuthGuard)
    @Get(":id")
    async getUser(
        @Param("id" , ParseIntPipe) id : number 
    ) {
        const user = await this.userService.get(id)
        if (!user) {
            throw new NotFoundException(`User with ${id} not found`)
        }
        
        return {
            message: "Your information was retrieved successful",
            success: true,
            data: user,
            statusCode : HttpStatus.OK
        }
    }
}