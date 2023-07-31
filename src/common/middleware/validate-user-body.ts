import { BadRequestException, PipeTransform } from "@nestjs/common";
import * as Joi from "joi"
import { UserDTO } from "src/user/user.dto";

const userSchema = Joi.object({
    email: Joi.string().email().required(), 
    username: Joi.string().required(), 
    password : Joi.string().min(8).required()
})

export class ValidateUserPipe implements PipeTransform {
    transform(value: UserDTO) : UserDTO {
        const result = userSchema.validate(value)
        if (result.error) {
            const errorMessages = result.error.details.map((e) => e.message).join()
            throw new BadRequestException(errorMessages)
        }

        return value as UserDTO
    }
}