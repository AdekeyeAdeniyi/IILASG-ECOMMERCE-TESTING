import { Body, Controller, Post, Request } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'generated/prisma';
import { CreateReviewDto } from 'src/common/dto/ceate-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // @Roles(Role.BUYER)
  @Post()
  async createView(
    @Request() req: { user: { userId: string } },
    @Body() reviewData: CreateReviewDto,
  ) {
    const vendorId = req.user.userId;
    return this.reviewService.createView(reviewData, vendorId);
  }
}
