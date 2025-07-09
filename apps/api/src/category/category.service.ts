import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from 'src/common/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/common/dto/update-category.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(vendorId: string, createCategory: CreateCategoryDto) {
    const existing = await this.prisma.category.findFirst({
      where: {
        name: createCategory.name.toLowerCase(),
        vendorId: vendorId,
      },
    });

    if (existing) {
      throw new ConflictException('You already have a category with this name');
    }

    return this.prisma.category.create({
      data: {
        name: createCategory.name.toLowerCase(),
        vendorId: vendorId,
      },
    });
  }

  async findAll(vendorId: string) {
    return this.prisma.category.findMany({
      where: { vendorId },
      orderBy: { name: 'asc' },
    });
  }

  async update(
    id: number,
    updateCategory: UpdateCategoryDto,
    vendorId: string,
  ) {
    const existing = await this.prisma.category.findFirst({
      where: { id, vendorId },
    });

    if (!existing)
      throw new NotFoundException('Category not found or access denied');

    return this.prisma.category.update({
      where: { id },
      data: {
        name: updateCategory.name.toLowerCase(),
      },
    });
  }

  async delete(id: number, vendorId: string) {
    const existing = await this.prisma.category.findFirst({
      where: { id, vendorId },
    });

    if (!existing)
      throw new NotFoundException('Category not found or access denied');

    await this.prisma.category.delete({ where: { id } });

    return { message: 'Category deleted successfully', categoryId: id };
  }
}
