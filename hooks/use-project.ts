import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface ProjectType {
  id: number;
  project_name: string;
  descriptions: string;
  tech_stack: string;
  link_github: string;
  link_website: string;
  logo: string;
}

export const useProject = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await api.get("/project");
      return res.data;
    },
  });
};

export const useAddProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const token = localStorage.getItem("token");
      const res = await api.post("/project", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateProject = () => {
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

      const res = await api.patch(`/project/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.error("Update project error:", error);
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem("token");
      await api.delete(`/project/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData<ProjectType[]>(
        ["projects"],
        (old) => old?.filter((project) => project.id !== deletedId) || []
      );
    },
  });
};
