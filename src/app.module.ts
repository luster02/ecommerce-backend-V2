import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.key';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/user/auth.module';
import { ShopModule } from './modules/shop/shop.module';
import { ProductsModule } from './modules/products/products.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { AssetModule } from './modules/asset/asset.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CartModule } from './modules/cart/cart.module';
import { CustomerModule } from './modules/customer/customer.module';
import { CustomerAuthModule } from './modules/auth/customer/customer.auth.module';

@Module({
  imports: [
    ConfigModule, DatabaseModule, UserModule,
    RoleModule, AuthModule, ShopModule,
    ProductsModule, GalleryModule, AssetModule,
    CloudinaryModule, CartModule, CustomerModule,
    CustomerAuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT)
  }

}
