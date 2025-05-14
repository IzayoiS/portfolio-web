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
import { useAddProject } from "@/hooks/use-project";
import {
  formProjectSchema,
  FormProjectSchemaDTO,
} from "@/utils/schemas/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";

export default function NewProject() {
  const form = useForm<FormProjectSchemaDTO>({
    resolver: zodResolver(formProjectSchema),
    defaultValues: {
      projectName: "",
      descriptions: "",
      techStack: "",
      linkGithub: "",
      linkWebsite: "",
      logo: null,
    },
  });

  const { mutate, isPending } = useAddProject();

  const onSubmit = (data: FormProjectSchemaDTO) => {
    const formData = new FormData();
    formData.append("project_name", data.projectName);
    formData.append("descriptions", data.descriptions);
    formData.append("tech_stack", data.techStack);
    if (data.linkGithub) formData.append("link_github", data.linkGithub);
    if (data.linkWebsite) formData.append("link_website", data.linkWebsite);
    if (data.logo) formData.append("logo", data.logo);

    mutate(formData, {
      onSuccess: () => {
        form.reset();
      },
    });
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
                  autoComplete="off"
                  className="border-neutral-400"
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
                <Input
                  {...field}
                  autoComplete="off"
                  className="border-neutral-400"
                />
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
                <Input
                  {...field}
                  autoComplete="off"
                  className="border-neutral-400"
                />
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
                <Input
                  {...field}
                  autoComplete="off"
                  className="border-neutral-400"
                />
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

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isPending}
        >
          {isPending ? <TailSpin height={20} width={20} /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
