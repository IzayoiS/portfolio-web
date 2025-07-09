import api from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface ExpType {
  id: number;
  company: string;
  role: string;
  tech_stack: string;
  start_month: string;
  start_year: string;
  end_month: string;
  end_year: string;
  currently_working: boolean;
  descriptions: string[];
  logo: string;
}

export const useExperience = () => {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await api.get("/experience");
      return res.data;
    },
  });
};

export const useAddExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (FormData: FormData) => {
      const token = localStorage.getItem("token");
      const res = await api.post("/experience", FormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
  });
};

export const useUpdateExperience = () => {
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

      const res = await api.patch(`/experience/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
    onError: (error) => {
      console.error("Update experience error:", error);
    },
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem("token");
      await api.delete(`/experience/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData<ExpType[]>(
        ["experiences"],
        (old) => old?.filter((exp) => exp.id !== deletedId) || []
      );
    },
  });
};
