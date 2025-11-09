
import { Review } from "@/types/review";

export const mockGoogleReviews: Review[] = [
  {
    id: 1001,
    type: "google-review",
    status: "published",
    rating: 5,
    publicReview: "Fantastic stay! The apartment was spotless and beautifully decorated. Excellent location, close to everything. Highly recommend!",
    reviewCategory: [],
    submittedAt: "2023-10-20 10:00:00",
    guestName: "Alice Wonderland",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    channel: "Google",
    isApproved: true,
  },
  {
    id: 1002,
    type: "google-review",
    status: "published",
    rating: 4,
    publicReview: "Good experience overall. The place was comfortable and well-equipped. A bit noisy at night, but that's expected in a city center.",
    reviewCategory: [],
    submittedAt: "2023-11-05 14:30:00",
    guestName: "Bob The Builder",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    channel: "Google",
    isApproved: true,
  },
  {
    id: 1003,
    type: "google-review",
    status: "published",
    rating: 5,
    publicReview: "Absolutely loved our stay here! The host was very responsive and helpful. The apartment felt like home. Will definitely be back!",
    reviewCategory: [],
    submittedAt: "2024-01-10 09:15:00",
    guestName: "Charlie Chaplin",
    listingName: "1B S2 B - Camden Lock Studios",
    channel: "Google",
    isApproved: true,
  },
];
