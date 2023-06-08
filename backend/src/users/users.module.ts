import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './users.providers';
import { AuthService } from '../auth/auth.service';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      //signOptions: {expiresIn: '60s'},
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders, AuthService],
  exports: [UsersService]
})
export class UsersModule {}
