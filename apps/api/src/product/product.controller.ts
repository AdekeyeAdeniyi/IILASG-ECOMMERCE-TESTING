import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from 'src/common/dto/create-product.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'generated/prisma';
import { UpdateProductDto } from 'src/common/dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(Role.VENDOR)
  @Post()
  async create(
    @Request() req: { user: { userId: string } },
    @Body() createProduct: CreateProductDto,
  ) {
    const vendorId = req.user.userId;
    if (vendorId) {
      return this.productService.createProduct(vendorId, createProduct);
    }
  }

  @Get()
  async getAllProducts(
    @Request() req: { user: { userId: string } },
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const vendorId = req.user.userId;
    const currentPage = parseInt(page, 10) || 1;
    const perPage = parseInt(limit, 10) || 20;

    return this.productService.findPaginatedProducts(
      vendorId,
      currentPage,
      perPage,
    );
  }

  @Get(':id')
  async getProductById(
    @Param('id') id: string,
    @Request() req: { user: { userId: string } },
  ) {
    const vendorId = req.user.userId;
    return await this.productService.getProductById(id, vendorId);
  }

  @Roles(Role.VENDOR)
  @Patch(':id')
  updateProduct(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() updateData: UpdateProductDto,
  ) {
    const vendorId = req.user.userId;
    return this.productService.updateProduct(id, updateData, vendorId);
  }

  @Roles(Role.VENDOR)
  @Delete(':id')
  async deleteProduct(
    @Param('id') productId: string,
    @Request() req: { user: { userId: string } },
  ) {
    const vendorId = req.user.userId;
    return this.productService.deleteProduct(productId, vendorId);
  }
}
