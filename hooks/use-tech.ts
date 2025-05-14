import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTechStacks = () => {
  return useQuery({
    queryKey: ["tech-stacks"],
    queryFn: async () => {
      const res = await api.get("/tech");
      return res.data;
    },
  });
};

export const useAddTechStack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.post("/tech", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tech-stacks"] });
    },
  });
};
