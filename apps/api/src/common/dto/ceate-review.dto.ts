import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: '2c6ff2aa-0e3d-4ace-86a6-2e8e3d780f58' })
  @IsString()
  @IsNotEmpty()
  productId: string;
  @ApiProperty({ example: 'Alberto' })
  @IsString()
  @IsNotEmpty()
  reviewerName: string;
  @ApiProperty({ example: 'I love this products' })
  @IsString()
  @IsNotEmpty()
  message: string;
  @ApiProperty({ example: 5 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  @Transform(({ value }) => parseInt(value))
  rating?: number;
}
