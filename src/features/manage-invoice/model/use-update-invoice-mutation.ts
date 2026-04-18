import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvoiceById } from "@/entities/invoice/api/update-invoice.ts";
import { invoiceQueryKeys } from "@/entities/invoice/model/invoice.query-keys.ts";
import type { IInvoice } from "@/entities/invoice/model/invoice.types.ts";

export const useUpdateInvoiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInvoiceById,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: invoiceQueryKeys.detail(variables.invoiceId),
      });

      const previousInvoice = queryClient.getQueryData<IInvoice>(
        invoiceQueryKeys.detail(variables.invoiceId),
      );

      queryClient.setQueryData<IInvoice>(
        invoiceQueryKeys.detail(variables.invoiceId),
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            ...variables.dto,
          };
        },
      );

      return { previousInvoice };
    },

    onError: (_error, variables, context) => {
      if (context?.previousInvoice) {
        queryClient.setQueryData(
          invoiceQueryKeys.detail(variables.invoiceId),
          context.previousInvoice,
        );
      }
    },

    onSuccess: (updatedInvoice, variables) => {

      // queryClient.setQueryData(
      //   invoiceQueryKeys.detail(variables.invoiceId),
      //   (oldData: IInvoice | undefined) => {
      //     if (!oldData) return oldData;
      //
      //     return {
      //       ...oldData,
      //       ...updatedInvoice,
      //     };
      //   },
      // );
    },
  });
};
