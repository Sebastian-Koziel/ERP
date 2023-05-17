import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    BadRequestException
} from '@nestjs/common'
import { UsersService } from '../users/users.service';
import { Reflector } from '@nestjs/core';
import { Access } from './access.enum';


@Injectable()
export class AccessGuard implements CanActivate {
    constructor(
        private usersService: UsersService,
        private reflector: Reflector
        ){}

    async canActivate(contex: ExecutionContext): Promise<boolean> {
        
        const request = contex.switchToHttp().getRequest();
        console.log(request.user);
        const current_user = await this.usersService.findOne(request.user.sub);

        if(!current_user){
            throw new BadRequestException('Wrong user');
        }
        
        const reqAccess = this.reflector.getAllAndOverride<Access>('access', [
            contex.getHandler(),
            contex.getClass(),
        ])
        if(!reqAccess){
            return true;
        }
        const path = reqAccess
        
        return this.get(current_user, path);
        
    }

    private get(obj: any, path: any): any {
        const parts = path.split('.');
    
        for (const part of parts) {
          if (!obj || !obj[part]) {
            return undefined;
          }
    
          obj = obj[part];
        }
    
        return obj;
    }

    
}