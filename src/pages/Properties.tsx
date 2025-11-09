import { useState, useEffect } from "react";
import { PropertyCard } from "@/components/reviews/PropertyCard";
import { Property } from "@/types/review";
import Header from "@/components/layout/Header";

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch("/api/reviews/hostaway");
      const data = await response.json();
      const reviews = data.result;
      const propertyMap = new Map<string, { reviews: any[]; name: string }>();
      reviews.forEach((review: any) => {
        if (!propertyMap.has(review.listingName)) {
          propertyMap.set(review.listingName, {
            reviews: [],
            name: review.listingName,
          });
        }
        propertyMap.get(review.listingName)!.reviews.push(review);
      });
      const properties = Array.from(propertyMap.entries()).map(
        ([name, data]) => {
          const avgRating =
            data.reviews.reduce((acc, r) => {
              const rating =
                r.rating ||
                r.reviewCategory.reduce(
                  (sum: any, cat: any) => sum + cat.rating,
                  0
                ) / r.reviewCategory.length;
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
            lastReviewDate: lastReview.submittedAt,
          };
        }
      );
      setProperties(properties);
    };
    fetchReviews();
  }, []);

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Properties;
