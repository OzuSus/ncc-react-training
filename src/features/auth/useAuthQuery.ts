import { useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { TAuthBody, useAuthStore } from '@/features/auth/useAuthStore.ts';

export function useAuthMutation() {
  return useMutation({
    mutationKey: ['auth'],
    mutationFn: (body: TAuthBody) => useAuthStore.getState().login(body),
  });
}

export function useFetchMeQuery() {
  const token = Cookies.get('accessToken');
  return useQuery({
    queryKey: ['me'],
    queryFn: () => useAuthStore.getState().fetchMe(),
    enabled: !!token,
  });
}
