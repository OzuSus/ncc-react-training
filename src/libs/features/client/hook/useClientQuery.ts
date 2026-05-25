import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchClientApi } from '@/libs/features/client/api/fetchClient.ts';
import {
  createClientApi,
  ICreateClientRequest,
} from '@/libs/features/client/api/createClient.ts';
import { IClient } from '@/libs/features/client/types.ts';

export function useClientQuery() {
  return useQuery<IClient[]>({
    queryKey: ['clients'],
    queryFn: async () => {
      const data = await fetchClientApi();
      return data.result || [];
    },
  });
}

export function useCreateClientMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ICreateClientRequest) => createClientApi(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
}
