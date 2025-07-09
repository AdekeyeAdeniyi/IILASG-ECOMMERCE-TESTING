import { Injectable } from '@nestjs/common';
import { argon2id, hash } from 'argon2';
import { Role } from 'generated/prisma';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { UpdateUserDto } from 'src/common/dto/update-user.dto';
import {
  UserDetails,
  UserDetailsWithTimestamps,
} from 'src/common/interface/user-details.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUser: UserDetails): Promise<UserDetailsWithTimestamps> {
    const { password, ...userInfo } = createUser;

    const hashedPassword = await hash(password, {
      type: argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 1,
    });

    return await this.prisma.user.create({
      data: {
        ...userInfo,
        password: hashedPassword,
      },
    });
  }

  async findByEmail(email: string): Promise<UserDetailsWithTimestamps | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async findById(userId: string): Promise<UserDetailsWithTimestamps | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  }

  async updateUser(
    userId: string,
    updateData: UpdateUserDto,
  ): Promise<UserDetailsWithTimestamps> {
    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }

  async deleteUser(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
