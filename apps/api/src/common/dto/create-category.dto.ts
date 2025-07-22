import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'gadget' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  name: string;
}
