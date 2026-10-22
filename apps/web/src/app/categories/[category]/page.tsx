import { redirect } from 'next/navigation';
import { CATEGORY_ALIASES } from '../../../lib/brand-data';

interface CategoryPageProps {
  params: {
    category: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function CategoryDetailPage({ params, searchParams }: CategoryPageProps) {
  const rawCat = (params.category || '').toLowerCase();
  const canonicalCat = CATEGORY_ALIASES[rawCat] || rawCat;

  const urlParams = new URLSearchParams();
  urlParams.set('category', canonicalCat);

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, val]) => {
      if (key !== 'category' && key !== 'cat') {
        if (Array.isArray(val)) {
          val.forEach((v) => {
            if (v) urlParams.append(key, v);
          });
        } else if (val) {
          urlParams.set(key, val);
        }
      }
    });
  }

  redirect(`/categories?${urlParams.toString()}`);
}
