import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './auth/config/jwt.config';
import refreshConfig from './auth/config/refresh.config';
import { TokenGuard } from './common/guard/token/token.guard';
import { TokenStrategy } from './common/strategy/token.strategy';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, refreshConfig],
    }),
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TokenStrategy,
    {
      provide: 'APP_GUARD',
      useClass: TokenGuard,
    },
  ],
})
export class AppModule {}
