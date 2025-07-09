import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { Role } from 'generated/prisma';
import { UserDetailsWithTimestamps } from 'src/common/interface/user-details.interface';
import { LocalAuthGuard } from './guard/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guard/refresh-auth/refresh-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GoogleAuthGuard } from './guard/google-auth/google-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* Vendor - Signup */
  @Post('signup/vendor')
  @ApiOperation({ summary: 'Register a new vendor' })
  @ApiResponse({ status: 201, description: 'Vendor registered successfully' })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  async signupVendor(
    @Body() createVendor: CreateUserDto,
  ): Promise<UserDetailsWithTimestamps | null> {
    return await this.authService.registerUser({
      ...createVendor,
      role: Role.VENDOR,
    });
  }

  /* Buyer - Signup */
  @Post('signup/buyer')
  @ApiOperation({ summary: 'Register a new buyer' })
  @ApiResponse({ status: 201, description: 'Buyer registered successfully' })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  async signupBuyer(
    @Body() createBuyer: CreateUserDto,
  ): Promise<UserDetailsWithTimestamps | null> {
    return await this.authService.registerUser({
      ...createBuyer,
      role: Role.BUYER,
    });
  }

  /* User Login */
  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'User login (email & password)' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    schema: {
      example: {
        user: {
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
        token: 'access-token',
        refreshToken: 'refresh-token',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'StrongP@ssw0rd' },
      },
    },
  })
  async signinUser(@Request() req: { user: UserDetailsWithTimestamps }) {
    const { id } = req.user;

    const token = await this.authService.generateToken(id!);

    return {
      user: {
        ...req.user,
      },
      token: token?.accessToken,
      refreshToken: token?.refreshToken,
    };
  }

  /* Google Authentication */
  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Initiate Google OAuth flow' })
  @ApiResponse({
    status: 200,
    description: 'Returns user profile after successful authentication',
    schema: {
      example: {
        user: {
          email: 'user@example.com',
          first_name: 'John',
          last_name: 'Doe',
        },
        isNewUser: true,
      },
    },
  })
  async googleAuth() {
    // Redirect to Google OAuth page
  }

  /* Google Authentication Redirect */
  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  @ApiExcludeEndpoint()
  async googleAuthRedirect(
    @Request()
    req: {
      user: {
        email: string;
        firstName: string;
        lastName: string;
        isNewUser: boolean;
      };
    },
  ) {
    const path = req.user.isNewUser ? '/setup' : '/dashboard';
    return {
      email: req.user.email,
      first_name: req.user.firstName,
      last_name: req.user.lastName,
      path,
    };
  }

  /* Refresh Token */
  @Post('/refreshToken')
  @UseGuards(RefreshAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Access token refreshed successfully',
    schema: {
      example: {
        token: 'new-access-token-here',
        refreshToken: 'new-refresh-token-here',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized or invalid refresh token',
  })
  async refreshToken(@Request() req: { user: UserDetailsWithTimestamps }) {
    const { id } = req.user;
    const token = await this.authService.generateToken(id!);

    return {
      token: token?.accessToken,
      refreshToken: token?.refreshToken,
    };
  }
}
