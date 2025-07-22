import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from 'src/common/dto/ceate-review.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async createView(reviewData: CreateReviewDto, vendorId: string) {
    const { reviewerName, productId, message, rating } = reviewData;

    const [existingProduct, existingUser] = await Promise.all([
      this.prisma.product.findUnique({
        where: { id: productId },
      }),
      this.prisma.user.findUnique({
        where: { id: vendorId },
      }),
    ]);

    if (!existingProduct) throw new NotFoundException('Product not found');

    if (!existingUser) throw new NotFoundException('User not found');

    const full_name = `${existingUser.first_name} ${existingUser.last_name}`;

    const review = await this.prisma.review.create({
      data: {
        reviewerName: reviewerName ? reviewerName : full_name,
        message: message,
        productId: productId,
        userId: vendorId,
        rating: rating,
      },
    });

    return {
      message: 'Review sent',
      data: review,
    };
  }
}
