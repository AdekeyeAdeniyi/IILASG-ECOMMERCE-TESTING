import { Body, Controller, Delete, Get, Put, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetailsWithTimestamps } from 'src/common/interface/user-details.interface';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from 'src/common/dto/update-user.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile retrieved successfully',
    schema: {
      example: {
        id: 'uuid',
        email: 'user@example.com',
        first_name: 'John',
        last_name: 'Doe',
        role: 'BUYER',
        isLagosian: true,
        state: 'Lagos',
        createdAt: '2024-06-10T12:00:00.000Z',
        updatedAt: '2024-06-10T12:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('')
  async getProfile(
    @Request() req: { user: { userId: string } },
  ): Promise<UserDetailsWithTimestamps | null> {
    const user = await this.userService.findById(req.user.userId);
    return user;
  }

  @Put('')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    schema: {
      example: {
        id: 'uuid',
        email: 'user@example.com',
        first_name: 'John',
        last_name: 'Doe',
        role: 'BUYER',
        isLagosian: true,
        state: 'Lagos',
        createdAt: '2024-06-10T12:00:00.000Z',
        updatedAt: '2024-06-10T12:00:00.000Z',
      },
    },
  })
  async updateProfile(
    @Request() req: { user: { userId: string } },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(req.user.userId, updateUserDto);
  }

  @Delete('')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current user account' })
  @ApiResponse({
    status: 200,
    description: 'User account deleted successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteUser(@Request() req: { user: { userId: string } }) {
    await this.userService.deleteUser(req.user.userId);
    return { message: 'User account deleted successfully' };
  }
}
