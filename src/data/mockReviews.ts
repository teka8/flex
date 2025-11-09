import { Review } from "@/types/review";

export const mockReviews: Review[] = [
  {
    id: 7453,
    type: "host-to-guest",
    status: "published",
    rating: null,
    publicReview: "Shane and family are wonderful! Would definitely host again :)",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2020-08-21 22:45:14",
    guestName: "Shane Finkelstein",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    channel: "Airbnb",
    isApproved: true
  },
  {
    id: 7454,
    type: "guest-to-host",
    status: "published",
    rating: 9,
    publicReview: "Amazing property in the heart of Shoreditch! Clean, modern, and perfectly located. The host was very responsive and accommodating. Would highly recommend!",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "value", rating: 9 },
      { category: "location", rating: 10 },
      { category: "check_in", rating: 9 }
    ],
    submittedAt: "2024-01-15 14:30:22",
    guestName: "Emma Thompson",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    channel: "Airbnb",
    isApproved: true
  },
  {
    id: 7455,
    type: "guest-to-host",
    status: "published",
    rating: 8,
    publicReview: "Great stay overall. The apartment was spacious and well-equipped. Minor issue with heating but host resolved it quickly.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 10 },
      { category: "value", rating: 8 },
      { category: "location", rating: 9 },
      { category: "check_in", rating: 8 }
    ],
    submittedAt: "2024-02-03 10:15:45",
    guestName: "Michael Chen",
    listingName: "1B S2 B - Camden Lock Studios",
    channel: "Booking.com",
    isApproved: false
  },
  {
    id: 7456,
    type: "guest-to-host",
    status: "published",
    rating: 10,
    publicReview: "Absolutely perfect! This property exceeded all expectations. Beautiful design, spotless cleanliness, and fantastic location near all the best restaurants and bars.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "value", rating: 10 },
      { category: "location", rating: 10 },
      { category: "check_in", rating: 10 }
    ],
    submittedAt: "2024-02-14 16:45:30",
    guestName: "Sophie Martin",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    channel: "Airbnb",
    isApproved: true
  },
  {
    id: 7457,
    type: "guest-to-host",
    status: "published",
    rating: 7,
    publicReview: "Decent property but could use some updates. WiFi was a bit slow and some furniture showed wear. Location is excellent though.",
    reviewCategory: [
      { category: "cleanliness", rating: 7 },
      { category: "communication", rating: 8 },
      { category: "value", rating: 7 },
      { category: "location", rating: 9 },
      { category: "check_in", rating: 8 }
    ],
    submittedAt: "2024-01-28 11:20:15",
    guestName: "David Rodriguez",
    listingName: "1B S2 B - Camden Lock Studios",
    channel: "Booking.com",
    isApproved: false
  },
  {
    id: 7458,
    type: "guest-to-host",
    status: "published",
    rating: 9,
    publicReview: "Wonderful experience from start to finish. The property photos don't do it justice - it's even better in person! Host was incredibly helpful with local recommendations.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 10 },
      { category: "value", rating: 9 },
      { category: "location", rating: 9 },
      { category: "check_in", rating: 9 }
    ],
    submittedAt: "2024-03-05 13:55:40",
    guestName: "Jessica Lee",
    listingName: "3B W1 C - Westminster Tower Suites",
    channel: "Airbnb",
    isApproved: true
  },
  {
    id: 7459,
    type: "guest-to-host",
    status: "published",
    rating: 1,
    publicReview: "Five stars all around! This is the gold standard for short-term rentals. Every detail was thoughtfully considered. We'll definitely be back!",
    reviewCategory: [
      { category: "cleanliness", rating: 1 },
      { category: "communication", rating: 10 },
      { category: "value", rating: 10 },
      { category: "location", rating: 10 },
      { category: "check_in", rating: 10 }
    ],
    submittedAt: "2024-03-12 09:30:25",
    guestName: "Robert Wilson",
    listingName: "3B W1 C - Westminster Tower Suites",
    channel: "Booking.com",
    isApproved: true
  },
  {
    id: 7460,
    type: "guest-to-host",
    status: "published",
    rating: 8,
    publicReview: "Very nice apartment with great amenities. Check-in process was smooth. Only minor complaint is street noise at night, but earplugs helped.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 8 },
      { category: "value", rating: 8 },
      { category: "location", rating: 8 },
      { category: "check_in", rating: 9 }
    ],
    submittedAt: "2024-02-20 15:40:50",
    guestName: "Amanda Foster",
    listingName: "1B S2 B - Camden Lock Studios",
    channel: "Airbnb",
    isApproved: true
  }
];
