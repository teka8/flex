import { useState, useMemo, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { PropertyCard } from "@/components/reviews/PropertyCard";
import { StatsCard } from "@/components/reviews/StatsCard";
import { Review, Property } from "@/types/review";
import { Star, TrendingUp, MessageSquare, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import ReviewsChart from "@/components/reviews/ReviewsChart";
import { mockReviews } from "../data/mockReviews"; // Import mock data

const Dashboard = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterChannel, setFilterChannel] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const fetchReviews = async () => {
      if (import.meta.env.PROD) {
        // In production, use mock data directly
        setReviews(mockReviews);
      } else {
        // In development, fetch from API
        const response = await fetch('/api/reviews/hostaway');
        const data = await response.json();
        setReviews(data.result);
      }
    };

    fetchReviews();
  }, []);

  const handleApprove = async (id: number) => {
    if (import.meta.env.PROD) {
      setReviews(reviews.map(r => r.id === id ? { ...r, isApproved: true } : r));
      toast.success("Review approved for public display");
    } else {
      const response = await fetch(`/api/reviews/${id}/approve`, { method: 'PUT' });
      if (response.ok) {
        const updatedReview = await response.json();
        setReviews(reviews.map(r => r.id === id ? updatedReview : r));
        toast.success("Review approved for public display");
      }
    }
  };

  const handleReject = async (id: number) => {
    if (import.meta.env.PROD) {
      setReviews(reviews.map(r => r.id === id ? { ...r, isApproved: false } : r));
      toast.error("Review rejected");
    } else {
      const response = await fetch(`/api/reviews/${id}/reject`, { method: 'PUT' });
      if (response.ok) {
        const updatedReview = await response.json();
        setReviews(reviews.map(r => r.id === id ? updatedReview : r));
        toast.error("Review rejected");
      }
    }
  };

  const filteredReviews = useMemo(() => {
    let filtered = reviews.filter(review => {
      const matchesSearch = review.publicReview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.listingName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesChannel = filterChannel === "all" || review.channel === filterChannel;
      
      const avgRating = review.rating || 
        (review.reviewCategory.reduce((acc, cat) => acc + cat.rating, 0) / review.reviewCategory.length);
      
      const matchesRating = filterRating === "all" || 
        (filterRating === "high" && avgRating >= 8) ||
        (filterRating === "medium" && avgRating >= 6 && avgRating < 8) ||
        (filterRating === "low" && avgRating < 6);

      const matchesCategory = filterCategory === "all" || review.reviewCategory.some(cat => cat.category === filterCategory);
      
      return matchesSearch && matchesChannel && matchesRating && matchesCategory;
    });

    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      } else if (sortBy === "rating") {
        const ratingA = a.rating || (a.reviewCategory.reduce((acc, cat) => acc + cat.rating, 0) / a.reviewCategory.length);
        const ratingB = b.rating || (b.reviewCategory.reduce((acc, cat) => acc + cat.rating, 0) / b.reviewCategory.length);
        return ratingB - ratingA;
      }
      return 0;
    });

    return filtered;
  }, [reviews, searchQuery, filterChannel, filterRating, filterCategory, sortBy]);

  const properties: Property[] = useMemo(() => {
    const propertyMap = new Map<string, { reviews: Review[]; name: string }>();
    
    reviews.forEach(review => {
      if (!propertyMap.has(review.listingName)) {
        propertyMap.set(review.listingName, { reviews: [], name: review.listingName });
      }
      propertyMap.get(review.listingName)!.reviews.push(review);
    });

    return Array.from(propertyMap.entries()).map(([name, data]) => {
      const avgRating = data.reviews.reduce((acc, r) => {
        const rating = r.rating || (r.reviewCategory.reduce((sum, cat) => sum + cat.rating, 0) / r.reviewCategory.length);
        return acc + rating;
      }, 0) / data.reviews.length;

      const lastReview = data.reviews.reduce((latest, r) => 
        new Date(r.submittedAt) > new Date(latest.submittedAt) ? r : latest
      );

      return {
        id: name,
        name,
        reviewCount: data.reviews.length,
        averageRating: avgRating,
        lastReviewDate: lastReview.submittedAt
      };
    });
  }, [reviews]);

  const stats = useMemo(() => {
    const totalReviews = reviews.length;
    const approvedReviews = reviews.filter(r => r.isApproved).length;
    const avgRating = reviews.reduce((acc, r) => {
      const rating = r.rating || (r.reviewCategory.reduce((sum, cat) => sum + cat.rating, 0) / r.reviewCategory.length);
      return acc + rating;
    }, 0) / reviews.length;

    return {
      totalReviews,
      approvedReviews,
      avgRating: avgRating.toFixed(1),
      totalProperties: properties.length
    };
  }, [reviews, properties]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reviews Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor property reviews</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Reviews"
            value={stats.totalReviews}
            icon={MessageSquare}
            trend={{ value: "+12% this month", isPositive: true }}
          />
          <StatsCard
            title="Average Rating"
            value={stats.avgRating}
            icon={Star}
            trend={{ value: "+0.3 from last month", isPositive: true }}
          />
          <StatsCard
            title="Approved Reviews"
            value={stats.approvedReviews}
            icon={CheckCircle}
          />
          <StatsCard
            title="Properties"
            value={stats.totalProperties}
            icon={TrendingUp}
          />
        </div>

        {/* Reviews Chart */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Review Trends</h2>
          <ReviewsChart reviews={reviews} />
        </div>

        {/* Properties Overview */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Property Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sm:max-w-xs"
          />
          <Select value={filterChannel} onValueChange={setFilterChannel}>
            <SelectTrigger className="sm:w-40">
              <SelectValue placeholder="Channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="Airbnb">Airbnb</SelectItem>
              <SelectItem value="Booking.com">Booking.com</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className="sm:w-40">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="high">8+ Stars</SelectItem>
              <SelectItem value="medium">6-8 Stars</SelectItem>
              <SelectItem value="low">Below 6</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="sm:w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Most Recent</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="sm:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="cleanliness">Cleanliness</SelectItem>
              <SelectItem value="communication">Communication</SelectItem>
              <SelectItem value="respect_house_rules">Respect House Rules</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reviews List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              All Reviews ({filteredReviews.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredReviews.map(review => (
              <ReviewCard
                key={review.id}
                review={review}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
