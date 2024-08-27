import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "../../roles.enum";

@Injectable()
export class RolGuard implements CanActivate{

    constructor(private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            'roles', 
            [context.getHandler(),
            context.getClass()]
        )

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const hasRol = () => requiredRoles.some(role => user?.roles?.includes(role))
        const valid = user && user.roles && hasRol()
        if(!valid){
            throw new ForbiddenException('No tiene permitido acceder a esta ruta')
        }
        return valid
        
    }

}