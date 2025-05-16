import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useProfile = (id: number) => {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      const res = await api.get(`/profile/${id}`);
      return res.data;
    },
  });
};

export const useAddProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.post("/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
