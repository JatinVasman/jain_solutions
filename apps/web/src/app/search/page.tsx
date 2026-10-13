import { redirect } from 'next/navigation';

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string; search?: string };
}) {
  const query = searchParams?.q || searchParams?.search || '';
  if (query) {
    redirect(`/categories?q=${encodeURIComponent(query)}`);
  }
  redirect('/categories');
}
