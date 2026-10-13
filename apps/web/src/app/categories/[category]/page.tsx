import { redirect } from 'next/navigation';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  redirect(`/categories?category=${params.category}`);
}
