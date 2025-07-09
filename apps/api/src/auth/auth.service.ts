import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import {
  UserDetails,
  UserDetailsWithTimestamps,
} from 'src/common/interface/user-details.interface';
import { UserService } from 'src/user/user.service';
import { ConfigType } from '@nestjs/config';
import refreshConfig from './config/refresh.config';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { decrypt, encrypt } from 'src/common/utils/crypto.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    @Inject(refreshConfig.KEY)
    private readonly refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {}

  async registerUser(
    userDetails: UserDetails,
  ): Promise<UserDetailsWithTimestamps | null> {
    const { email } = userDetails;
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    if (userDetails.isLagosian) {
      if (!userDetails.state) {
        throw new BadRequestException(
          'Lagosian users must provide their state (e.g., "Victoria Island")',
        );
      }
    }

    const user = await this.userService.create(userDetails);
    return user;
  }

  async validateLocalUser(
    email: string,
    password: string,
  ): Promise<UserDetailsWithTimestamps | null> {
    const existingUser = await this.userService.findByEmail(email);

    if (!existingUser) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await verify(existingUser.password, password);

    if (!isPasswordValid) return null;

    return existingUser;
  }

  async validateUserById(userId: string) {
    const user: UserDetailsWithTimestamps | null =
      await this.userService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async generateToken(
    userId: string,
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    if (!userId) return null;

    const payload = { sub: userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    const encryptedRefreshToken = await encrypt(refreshToken);
    if (!encryptedRefreshToken) return null;

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

    await this.prisma.refreshTokenSession.upsert({
      where: { userId },
      update: {
        refreshTokenId: encryptedRefreshToken,
        revoked: false,
        expiresAt,
        createdAt: new Date(),
      },
      create: {
        userId,
        refreshTokenId: encryptedRefreshToken,
        revoked: false,
        expiresAt,
      },
    });

    return { accessToken, refreshToken };
  }

  async findRefreshTokenSession(userId: string) {
    const refreshToken = await this.prisma.refreshTokenSession.findUnique({
      where: { userId },
    });

    if (refreshToken) {
      const decryptedRefreshToken = await decrypt(refreshToken.refreshTokenId);

      return {
        ...refreshToken,
        refreshTokenId: decryptedRefreshToken,
      };
    }

    return null;
  }

  async validateRefreshToken(userId: string) {
    return this.validateUserById(userId);
  }
}
