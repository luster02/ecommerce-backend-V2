import { Module } from '@nestjs/common';
import { CustomerAuthController } from './customer.auth.controller';
import { CustomerAuthService } from './customer.auth.service';

@Module({
  controllers: [CustomerAuthController],
  providers: [CustomerAuthService]
})
export class CustomerAuthModule {}
