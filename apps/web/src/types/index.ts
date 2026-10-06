export * from '@rental-platform/types';

export interface PageProps<
  TParams = Record<string, string>,
  TSearch = Record<string, string | string[] | undefined>,
> {
  params: TParams;
  searchParams: TSearch;
}
