import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCustomerApi } from '@/libs/features/project/api/fetchCustomer';
import {
  addCustomerApi,
  IAddCustomerRequest,
} from '@/libs/features/project/api/addCustomer.ts';
import { ICustomer } from '@/libs/features/project/types';

export function useCustomerQuery() {
  return useQuery<ICustomer[]>({
    queryKey: ['customers'],
    queryFn: async () => {
      const data = await fetchCustomerApi();
      return data.result || [];
    },
  });
}

export function useSaveCustomerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: IAddCustomerRequest) => addCustomerApi(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
}
