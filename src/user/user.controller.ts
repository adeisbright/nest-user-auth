import { Controller , Get, HttpStatus, NotFoundException, Param} from "@nestjs/common";
import { UserService } from "./user.services";

@Controller("users") 

export class UserController {
    constructor(
        private userService : UserService
    ) { }
    
    @Get(":id")
    async getUsers(
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