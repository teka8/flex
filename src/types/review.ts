export interface ReviewCategory {
  category: string;
  rating: number;
}

export interface Review {
  id: number;
  type: string;
  status: string;
  rating: number | null;
  publicReview: string;
  reviewCategory: ReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingName: string;
  channel?: string;
  isApproved?: boolean;
}

export interface Property {
  id: string;
  name: string;
  reviewCount: number;
  averageRating: number;
  lastReviewDate: string;
}
