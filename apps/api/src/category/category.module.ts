import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, JwtService],
})
export class CategoryModule {}
