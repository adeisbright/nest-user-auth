import { Controller , Get, HttpStatus, NotFoundException, Param, UseGuards} from "@nestjs/common";
import { UserService } from "./user.services";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("users") 

export class UserController {
    constructor(
        private userService : UserService
    ) { }
    
    @Get()
    async getUsers() {
        const user = await this.userService.getAll()
       
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
        @Param("id") id : string
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