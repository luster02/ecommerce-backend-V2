import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('open commerce API')
    .setDescription('open commerce API')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setVersion('1.0')
    .addTag('asset')
    .addTag('customer')
    .addTag('gallery')
    .addTag('products')
    .addTag('role')
    .addTag('shop')
    //.addTag('cart')
    .addTag('user')
    .addTag('auth user')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(AppModule.port);
}
bootstrap();
