import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request , Response } from "express";

@Catch(HttpException) 

export class GlobalErrorFilter implements ExceptionFilter {
    catch(
        exception: HttpException,
        host: ArgumentsHost)
    {
        const ctx = host.switchToHttp() 
        const request = ctx.getRequest<Request>() 
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()

        response
            .status(status)
            .json({
                message: exception.message, 
                data: {}, 
                success: false, 
                statusCode: status,
                errorPath : request.url 
        })
    }
}