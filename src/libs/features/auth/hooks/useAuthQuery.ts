import { useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/libs/features/auth/useAuthStore.ts';
import { loginApi, IAuthBody } from '@/libs/features/auth/api/login.ts';
import { fetchMeApi } from '@/libs/features/auth/api/fetchMe.ts';
import { fetchUserConfigPermission } from '@/libs/features/auth/api/fetchUserConfigApi.ts';

export function useAuthMutation() {
  return useMutation({
    mutationKey: ['auth'],
    mutationFn: async (body: IAuthBody) => {
      const data = await loginApi(body);
      if (!data?.success) {
        throw new Error(data?.error?.message || 'Login failed');
      }
      const result = data.result;
      const secure = window.location.protocol === 'https';
      const expireInSeconds = result.expireInSeconds;
      Cookies.set('accessToken', result.accessToken, {
        sameSite: 'strict',
        secure,
        expires: expireInSeconds / 60 / 60 / 24,
      });
      Cookies.set('encryptedAccessToken', result.encryptedAccessToken, {
        sameSite: 'strict',
        secure,
        expires: expireInSeconds / 60 / 60 / 24,
      });
    },
  });
}

export function useFetchMeQuery() {
  const setUser = useAuthStore((state) => state.setUser);
  const token = Cookies.get('accessToken');
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const [userInfo, userConfigPermission] = await Promise.all([
        fetchMeApi(),
        fetchUserConfigPermission(),
      ]);
      const grantedPermissions =
        userConfigPermission.result.auth.grantedPermissions;
      const permissions = Object.keys(grantedPermissions);
      const user = userInfo.result.user;
      setUser(user, permissions);
      return {
        user,
        permissions,
      };
    },
    enabled: !!token,
  });
}
