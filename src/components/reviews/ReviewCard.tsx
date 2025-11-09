import { Review } from "@/types/review";
import { Card, CardContent } from "@/components/ui/card";
import { Star, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ReviewCardProps {
  review: Review;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  showActions?: boolean;
}

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`}
      />
    );
  }
  return <div className="flex">{stars}</div>;
};

export function ReviewCard({ review, onApprove, onReject, showActions = true }: ReviewCardProps) {
  const averageRating = review.rating || 
    (review.reviewCategory.reduce((acc, cat) => acc + cat.rating, 0) / review.reviewCategory.length);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 mr-4">
            {review.guestName.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold">{review.guestName}</h3>
            <p className="text-sm text-gray-500">
              {format(new Date(review.submittedAt), "MMMM yyyy")}
            </p>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <StarRating rating={averageRating} />
        </div>
        <p className="text-gray-700">{review.publicReview}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {review.reviewCategory.map((cat, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {cat.category.replace(/_/g, " ")}: {cat.rating}/10
            </Badge>
          ))}
        </div>
        {showActions && (
          <div className="flex items-center justify-between pt-4 mt-4 border-t">
            <div>
              {review.isApproved ? (
                <Badge variant="default" className="bg-green-500">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Approved
                </Badge>
              ) : (
                <Badge variant="default" className="bg-gray-500">
                  <XCircle className="h-3 w-3 mr-1" />
                  Pending
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onApprove?.(review.id)}
                className="text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
              >
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onReject?.(review.id)}
                className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
