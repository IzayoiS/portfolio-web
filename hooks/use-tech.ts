import { TechType } from "@/app/cms/tech/components/editTechStack";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface techType {
  id: number;
  name: string;
  icon: string;
}

export const useTechStacks = () => {
  return useQuery({
    queryKey: ["tech-stacks"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
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

export const useUpdateTechStack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: number;
      formData: FormData;
    }) => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      formData.append("user_id", userId || "");

      const res = await api.patch(`/tech/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tech-stacks"] });
    },
    onError: (error) => {
      console.error("Update tech error", error);
    },
  });
};

export const useDeleteTechStack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem("token");
      await api.delete(`/tech/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData<TechType[]>(
        ["tech-stacks"],
        (old) => old?.filter((tech) => tech.id !== deletedId) || []
      );
    },
  });
};
