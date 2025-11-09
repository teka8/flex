import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin, Users, Wifi, Coffee, Tv, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Review } from "@/types/review";
import { mockGoogleReviews } from "@/data/mockGoogleReviews";
import { mockReviews } from "../data/mockReviews"; // Import mock data

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [propertyName, setPropertyName] = useState<string>("");
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      const decodedId = decodeURIComponent(id ?? "");
      setPropertyName(decodedId);

      if (import.meta.env.PROD) {
        // In production, use mock data directly
        setReviews(mockReviews.filter((r: Review) => r.listingName === decodedId));
      } else {
        // In development, fetch from API
        const response = await fetch('/api/reviews/hostaway');
        const data = await response.json();
        setReviews(data.result.filter((r: Review) => r.listingName === decodedId));
      }
    };

    fetchReviews();
  }, [id]);

  const approvedReviews = reviews.filter(r => r.isApproved);
  const propertyGoogleReviews = mockGoogleReviews.filter(r => r.listingName === propertyName);

  const avgRating = approvedReviews.length > 0
    ? approvedReviews.reduce((acc, r) => {
        const rating = r.rating || (r.reviewCategory.reduce((sum, cat) => sum + cat.rating, 0) / r.reviewCategory.length);
        return acc + rating;
      }, 0) / approvedReviews.length
    : 0;

  const amenities = [
    { icon: Wifi, label: "Free WiFi" },
    { icon: Tv, label: "Internet" },
    { icon: Coffee, label: "Private living room" },
    { icon: Users, label: "Essentials" },
    { icon: Users, label: "Towels" },
    { icon: Users, label: "Kitchen" },
  ];

  const images = [
    "https://bookingenginecdn.hostaway.com/listing/23248-79029-1DNvDYRdLXEs8zYkdv5-C--soHnVysh8PYgkf0eatwJM-68e64bf937084?width=2560&quality=70&format=webp&v=2",
    "https://bookingenginecdn.hostaway.com/listing/23248-79029-1DNvDYRdLXEs8zYkdv5-C--soHnVysh8PYgkf0eatwJM-68e64bf937084?width=2560&quality=70&format=webp&v=2",
    "https://bookingenginecdn.hostaway.com/listing/23248-79029-1DNvDYRdLXEs8zYkdv5-C--soHnVysh8PYgkf0eatwJM-68e64bf937084?width=2560&quality=70&format=webp&v=2",
    "https://bookingenginecdn.hostaway.com/listing/23248-79029-1DNvDYRdLXEs8zYkdv5-C--soHnVysh8PYgkf0eatwJM-68e64bf937084?width=2560&quality=70&format=webp&v=2",
    "https://bookingenginecdn.hostaway.com/listing/23248-79029-1DNvDYRdLXEs8zYkdv5-C--soHnVysh8PYgkf0eatwJM-68e64bf937084?width=2560&quality=70&format=webp&v=2",

  ];

  

  return (
    <div className="bg-white">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">Flex Living</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-800">All listings</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">About Us</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Contact Us</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-16 py-8">
        <div className="flex gap-2 h-[400px] mb-8">
          <div className="w-1/2">
            <img src={images[0]} alt="Property" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-2">
            <img src={images[1]} alt="Property" className="w-full h-full object-cover rounded-lg" />
            <img src={images[2]} alt="Property" className="w-full h-full object-cover rounded-lg" />
            <img src={images[3]} alt="Property" className="w-full h-full object-cover rounded-lg" />
            <img src={images[4]} alt="Property" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{propertyName}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <span>Apartment</span>
              <span className="mx-2">·</span>
              <span>4 guests</span>
              <span className="mx-2">·</span>
              <span>1 bedroom</span>
              <span className="mx-2">·</span>
              <span>1 bathroom</span>
            </div>
            <div className="flex items-center mb-4">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-semibold">{avgRating.toFixed(2)}</span>
              <span className="mx-2">·</span>
              <a href="#reviews" className="text-blue-600 hover:underline">{approvedReviews.length} reviews</a>
            </div>

            <p className="text-gray-700 mb-6">
              This spacious apartment in Pimlico is ideal for anyone looking for comfort and convenience. It’s just a short walk from everything you need – restaurants, shops, and public transport. The apartment has great quality amenities, making it a perfect home away from home.
            </p>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <amenity.icon className="h-6 w-6 text-gray-700" />
                  <span>{amenity.label}</span>
                </div>
              ))}
            </div>
            <Button variant="outline">Show all {amenities.length} amenities</Button>

            <hr className="my-8" />

            <div id="reviews">
              <h2 className="text-2xl font-bold mb-4">Reviews</h2>
              <div className="flex items-center mb-6">
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                <span className="ml-2 text-2xl font-bold">{avgRating.toFixed(2)}</span>
                <span className="ml-2 text-gray-600">({approvedReviews.length} reviews)</span>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {approvedReviews.slice(0, showAllReviews ? approvedReviews.length : 4).map(review => (
                  <ReviewCard key={review.id} review={review} showActions={false} />
                ))}
              </div>
              {approvedReviews.length > 4 && (
                <Button variant="outline" className="mt-6" onClick={() => setShowAllReviews(!showAllReviews)}>
                  {showAllReviews ? "Show less reviews" : "Show all reviews"}
                </Button>
              )}
            </div>

            <hr className="my-8" />

            <div>
              <h2 className="text-2xl font-bold mb-4">Good to know</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">House Rules</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Check-in: 3 pm</li>
                    <li>Check-out: 10 am</li>
                    <li>Pets: not allowed</li>
                    <li>Smoking inside: not allowed</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Cancellation policy</h3>
                  <p className="text-gray-700">100% refund up to 14 days before arrival</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  This is a mock booking form.
                </p>
                <Button className="w-full mt-4">Book Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 mt-12">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="text-gray-600">&copy; 2025 Flex Living</div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Terms and conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PropertyDetails;
