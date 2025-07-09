import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCategoryDto } from 'src/common/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/common/dto/update-category.dto';

@ApiBearerAuth()
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  async create(
    @Request() req: { user: { userId: string } },
    @Body() CreateCategory: CreateCategoryDto,
  ) {
    const vendorId = req.user.userId;
    return this.categoryService.create(vendorId, CreateCategory);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'List of all categories returned successfully',
  })
  async findAll(@Request() req: { user: { userId: string } }) {
    const vendorId = req.user.userId;
    const categories = await this.categoryService.findAll(vendorId);
    if (categories.length === 0) {
      return { message: 'No categories found', data: [] };
    }
    return categories;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: { userId: string } },
    @Body() updateCategory: UpdateCategoryDto,
  ) {
    const vendorId = req.user.userId;
    return this.categoryService.update(id, updateCategory, vendorId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  delete(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: { userId: string } },
  ) {
    const vendorId = req.user.userId;
    return this.categoryService.delete(id, vendorId);
  }
}
