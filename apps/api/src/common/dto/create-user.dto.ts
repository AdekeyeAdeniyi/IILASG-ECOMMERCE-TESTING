import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd!',
    description:
      'Password must contain uppercase, lowercase, and numbers/special characters',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password too weak - must contain uppercase, lowercase, and numbers/special chars',
  })
  password: string;

  @ApiProperty({
    example: true,
    description: 'Whether the user is a Lagosian (true or false)',
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true || value === 1)
  isLagosian: boolean;

  @ApiPropertyOptional({
    example: 'Lagos',
    description: 'State name, required if user is a Lagosian',
  })
  @IsOptional()
  @IsString()
  state?: string;
}
