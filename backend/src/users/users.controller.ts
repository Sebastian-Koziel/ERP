 import { Body, Controller, Post, Get, Param, UseGuards, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { AccessGuard } from '../auth/access.guard';
import { Access_decorator } from '../auth/access.decorator';
import { Access } from '../auth/access.enum';
import { UpdateUser } from './interfaces/updateUser.interface';

@Controller('auth')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
        ) {}
    
    //@Access_decorator(Access.usersTab_addingUser)
    //@UseGuards(AuthGuard, AccessGuard)
    @Post('create')
    createUser(@Body() body: CreateUserDto) {
        console.log(`in user constroller ${body.name}`);
        return this.authService.registerEmployee(body);
    }

    @Post('update')
    updateUser(@Body() body: UpdateUser) {
        return this.usersService.update(body.id, body.attr);
    }

    //special end point for changing access set for user - so only admin can do that
    @Access_decorator(Access.canChangeUserAccess)
    @UseGuards(AuthGuard, AccessGuard)
    @Post('updateAccess')
    updateUserAccess(@Body() body: UpdateUser) {
        return this.usersService.update(body.id, body.attr);
    }

    @Post('login')
    logIn(@Body() body: CreateUserDto) {
        return this.authService.logIn(body.login, body.password)
    }

    //@Access_decorator(Access.usersTab_access)
    //@UseGuards(AuthGuard, AccessGuard)
    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    //@Access_decorator(Access.usersTab_access)
    //@UseGuards(AuthGuard, AccessGuard)
    @Get('/:id')
    async findOne(@Param('id') id:string): Promise<User>{
        return this.usersService.findOne(id);
    }

    //@Access_decorator(Access.usersTab_access)
    //@UseGuards(AuthGuard, AccessGuard)
    @Delete('/:id')
    async remove(@Param('id') id:string){
        this.usersService.remove(id);
    }

    
}
