import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productProviders } from './products.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[DatabaseModule, UsersModule],
  controllers: [ProductsController],
  providers: [ProductsService, ...productProviders, AuthService],
  exports: [ProductsService]
})
export class ProductsModule {}
