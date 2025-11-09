import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Review } from "@/types/review";
import { Star } from "lucide-react";
import { mockReviews } from "../data/mockReviews"; // Import mock data

const DashboardPropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [propertyName, setPropertyName] = useState<string>("");

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

  const avgRating = reviews.length > 0
    ? reviews.reduce((acc, r) => {
        const rating = r.rating || (r.reviewCategory.reduce((sum, cat) => sum + cat.rating, 0) / r.reviewCategory.length);
        return acc + rating;
      }, 0) / reviews.length
    : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{propertyName}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Star className="h-5 w-5" />
            <span>{avgRating.toFixed(1)}</span>
            <span>({reviews.length} reviews)</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {reviews.map(review => (
            <ReviewCard
              key={review.id}
              review={review}
              showActions={true}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPropertyDetails;
