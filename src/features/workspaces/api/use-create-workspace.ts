import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.workspaces)["$post"]>;

export const useCreateWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (form) => {
      const response = await client.api.workspaces.$post(form);
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Workspace created.");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: () => {
      toast.error("Failed to create workspace.");
    },
  });

  return mutation;
};
