import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateProject } from "@/hooks/use-project";
import {
  formProjectSchema,
  FormProjectSchemaDTO,
} from "@/utils/schemas/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import { ProjectType } from "@/hooks/use-project";
import { toast } from "sonner";

interface EditProjectProps {
  project: ProjectType;
  onClose: () => void;
}

export default function EditProject({ project, onClose }: EditProjectProps) {
  const form = useForm<FormProjectSchemaDTO>({
    resolver: zodResolver(formProjectSchema),
    defaultValues: {
      projectName: project.project_name,
      descriptions: project.descriptions,
      techStack: project.tech_stack,
      linkGithub: project.link_github || "",
      linkWebsite: project.link_website || "",
      logo: null,
    },
  });

  const { mutate, isPending } = useUpdateProject();

  const onSubmit = (data: FormProjectSchemaDTO) => {
    const formData = new FormData();

    formData.append("project_name", data.projectName);
    formData.append("descriptions", data.descriptions);
    formData.append("tech_stack", data.techStack);
    formData.append("link_github", data.linkGithub || "");
    formData.append("link_website", data.linkWebsite || "");

    const userId = localStorage.getItem("userId");
    if (userId) formData.append("user_id", userId);

    if (data.logo instanceof File) {
      formData.append("logo", data.logo);
    } else if (project.logo) {
      formData.append("logo_url", project.logo);
    }

    mutate(
      { id: project.id, formData },
      {
        onSuccess: () => {
          toast("Project updated successfully");
          onClose();
        },
        onError: (error) => {
          console.error("Error updating project:", error);
          toast("Failed to update project");
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-black text-slate-200 space-y-6"
      >
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="border-neutral-400"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descriptions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="resize-none w-full border-neutral-400"
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="techStack"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tech Stack (comma separated)</FormLabel>
              <FormControl>
                <Input {...field} className="border-neutral-400" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkGithub"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Github</FormLabel>
              <FormControl>
                <Input {...field} className="border-neutral-400" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input {...field} className="border-neutral-400" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                  className="border-neutral-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button
            type="submit"
            className="flex-1 cursor-pointer"
            disabled={isPending}
          >
            {isPending ? <TailSpin height={20} width={20} /> : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
