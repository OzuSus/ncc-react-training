import { useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/features/auth/useAuthStore.ts';
import { TAuthBody } from '@/features/auth/api/login.ts';

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
