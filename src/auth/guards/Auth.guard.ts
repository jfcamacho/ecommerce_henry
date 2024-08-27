import { BadRequestException, CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { Role } from "../../roles.enum";

const validarGuard = async (jwtService: JwtService, context: ExecutionContext): Promise<boolean> => {
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization.split(' ')[1]
    if(token){
        try {
            const secret = process.env.JWT_SECRET
            const payload = jwtService.verify(token, {secret: secret})
            payload.iat = new Date(payload.iat * 1000)
            payload.exp = new Date(payload.exp * 1000)
            payload.roles = Role.Admin
            request.user = payload
            return true
        } catch (error) {
            throw new UnauthorizedException('No ha sido authorizado para cceder a este sitio')
        }
    }else{
        throw new BadRequestException('No se ha provisto del token respectivo')
    }
}

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private readonly jwtService: JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const result = await validarGuard(this.jwtService, context)
        return result
    }
}