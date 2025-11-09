import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Review } from '@/types/review';

interface ReviewsChartProps {
  reviews: Review[];
}

const ReviewsChart = ({ reviews }: ReviewsChartProps) => {
  const data = reviews.reduce((acc, review) => {
    const date = new Date(review.submittedAt).toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, [] as { date: string; count: number }[]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" name="Reviews per day" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReviewsChart;
