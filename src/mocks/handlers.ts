
import { http, HttpResponse } from 'msw';
import { mockReviews } from '@/data/mockReviews';
import { Review } from '@/types/review';

let reviews: Review[] = [...mockReviews];

export const handlers = [
  http.get('/api/reviews/hostaway', () => {
    return HttpResponse.json({
      status: 'success',
      result: reviews,
    });
  }),

  http.put('/api/reviews/:id/approve', async ({ params }) => {
    const { id } = params;
    const reviewId = parseInt(id as string, 10);
    const review = reviews.find(r => r.id === reviewId);

    if (review) {
      review.isApproved = true;
      return HttpResponse.json(review);
    }

    return new HttpResponse(null, { status: 404 });
  }),

  http.put('/api/reviews/:id/reject', async ({ params }) => {
    const { id } = params;
    const reviewId = parseInt(id as string, 10);
    const review = reviews.find(r => r.id === reviewId);

    if (review) {
      review.isApproved = false;
      return HttpResponse.json(review);
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
