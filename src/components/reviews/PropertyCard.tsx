import { Property } from "@/types/review";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link to={`/dashboard/property/${encodeURIComponent(property.name)}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="truncate">{property.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Total Reviews</span>
            <span>{property.reviewCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Average Rating</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-semibold">{property.averageRating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Last Review</span>
            </div>
            <span>{format(new Date(property.lastReviewDate), "MMM d, yyyy")}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
