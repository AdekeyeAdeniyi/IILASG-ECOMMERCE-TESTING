import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsDecimal,
  IsArray,
} from 'class-validator';
import { AvailabilityStatus } from 'generated/prisma';

export class CreateProductDto {
  @ApiProperty({ example: 'Samsung Galaxy S24' })
  @IsString()
  name: string;

  @ApiProperty({ example: '799.9' })
  @IsDecimal()
  price: number;

  @ApiProperty({ example: 50.0 })
  @IsDecimal()
  discount: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true || value === 1)
  isFeatured?: boolean;

  @ApiProperty({ example: 'IN_STOCK' })
  @IsEnum(AvailabilityStatus)
  availability: AvailabilityStatus;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Type(() => Number)
  totalQuantity: number;

  @ApiProperty({ example: 'Flagship Samsung phone' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Type(() => Number)
  categoryId?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features: string[];
}
