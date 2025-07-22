import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { CreateProductDto } from 'src/common/dto/create-product.dto';
import { UpdateProductDto } from 'src/common/dto/update-product.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { slugify } from 'src/common/utils/slugify.util';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(
    vendorId: string,
    {
      name,
      price,
      discount,
      availability,
      totalQuantity,
      description,
      isFeatured,
      categoryId,
      features,
    }: CreateProductDto,
  ) {
    const [categoryExists, vendorExists] = await Promise.all([
      this.prisma.category.findUnique({
        where: { id: categoryId, userId: vendorId },
      }),
      this.prisma.user.findUnique({
        where: { id: vendorId, role: 'VENDOR' },
      }),
    ]);

    if (!categoryExists) throw new NotFoundException('Category not found');

    if (!vendorExists) throw new NotFoundException('Vendor not found');

    const existingProduct = await this.prisma.product.findFirst({
      where: {
        name: name,
        categoryId,
        userId: vendorId,
      },
    });

    if (existingProduct) {
      throw new ConflictException(
        'Product already exists for this vendor in this category',
      );
    }

    const slug = slugify(name);

    const product = await this.prisma.product.create({
      data: {
        name,
        slug,
        price: parseFloat(price as any),
        discount: parseFloat(discount as any),
        availability,
        totalQuantity,
        description,
        isFeatured,
        categoryId,
        userId: vendorId,
      },
    });

    if (product?.id && Array.isArray(features) && features.length > 0) {
      await this.prisma.feature.createMany({
        data: features.map((value) => ({
          value,
          productId: product.id,
        })),
      });
    }

    return {
      message: 'Product created successfully',
      data: product,
    };
  }

  async findPaginatedProducts(vendorId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const user = await this.prisma.user.findUnique({
      where: { id: vendorId },
      select: { role: true },
    });

    const whereClause = user?.role === 'VENDOR' ? { userId: vendorId } : {};

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take: limit,
        include: {
          features: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        where: whereClause,
      }),
      this.prisma.product.count({
        where: whereClause,
      }),
    ]);

    return {
      meta: {
        currentPage: page,
        perPage: limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
      data: products.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        discount: product.discount,
        availability: product.availability,
        totalQuantity: product.totalQuantity,
        quantitySold: product.quantitySold,
        description: product.description,
        isFeatured: product.isFeatured,
        categoryId: product.categoryId,
        vendorId: product.userId,
        features: product.features.map((f) => f.value),
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      })),
    };
  }

  async updateProduct(
    productId: string,
    updateData: UpdateProductDto,
    vendorId: string,
  ) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    if (existingProduct.userId !== vendorId) {
      throw new NotFoundException('You do not own this product');
    }

    const updatePayload: Prisma.ProductUpdateInput = {};

    if (updateData.name !== undefined) {
      updatePayload.name = updateData.name;
      updatePayload.slug = slugify(updateData.name);
    }

    if (updateData.price !== undefined) {
      updatePayload.price = parseFloat(updateData.price.toString());
    }

    if (updateData.discount !== undefined) {
      updatePayload.discount = parseFloat(updateData.discount.toString());
    }

    if (updateData.availability !== undefined) {
      updatePayload.availability = updateData.availability;
    }

    if (updateData.totalQuantity !== undefined) {
      updatePayload.totalQuantity = updateData.totalQuantity;
    }

    if (updateData.description !== undefined) {
      updatePayload.description = updateData.description;
    }

    if (updateData.isFeatured !== undefined) {
      updatePayload.isFeatured = updateData.isFeatured;
    }

    if (updateData.categoryId !== undefined) {
      const validCategory = await this.prisma.category.findFirst({
        where: {
          id: updateData.categoryId,
          userId: vendorId,
        },
      });

      if (!validCategory) {
        throw new NotFoundException(
          `Category not found or doesn't belong to you`,
        );
      }

      updatePayload.category = {
        connect: { id: updateData.categoryId },
      };
    }

    const updatedProduct = await this.prisma.product.update({
      where: { id: productId },
      data: updatePayload,
    });

    return updatedProduct;
  }

  async getProductById(productId: string, vendorId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId, userId: vendorId },
      include: {
        user: {
          select: {
            email: true,
            first_name: true,
            last_name: true,
            role: true,
            state: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        features: true,
        reviews: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async deleteProduct(productId: string, vendorId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.userId !== vendorId) {
      throw new ForbiddenException('You do not own this product');
    }

    return this.prisma.product.delete({
      where: { id: productId },
    });
  }
}
