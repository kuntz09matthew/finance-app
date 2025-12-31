import apiClient from '@/utils/apiClient';
import { useQuery } from '@tanstack/react-query';

export function useExampleData() {
  return useQuery({
    queryKey: ['exampleData'],
    queryFn: async () => {
      const { data } = await apiClient.get('/example');
      return data;
    },
  });
}
