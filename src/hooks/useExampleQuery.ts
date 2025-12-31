import { useQuery } from '@tanstack/react-query';
import { fetchExampleData } from '@/api/exampleApi';

export function useExampleQuery() {
  return useQuery({
    queryKey: ['exampleData'],
    queryFn: fetchExampleData,
  });
}
