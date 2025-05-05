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
import {
  formProjectSchema,
  FormProjectSchemaDTO,
} from "@/utils/schemas/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function NewProject() {
  const form = useForm<FormProjectSchemaDTO>({
    resolver: zodResolver(formProjectSchema),
    defaultValues: {
      projectName: "",
      descriptions: [""],
      techStack: "",
      linkGithub: "",
      linkWebsite: "",
      logo: null,
    },
  });

  const {} = form;

  const onSubmit = (data: FormProjectSchemaDTO) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-black text-slate-200 overflow-hidden space-y-6"
      >
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name *</FormLabel>
              <FormControl className="border-neutral-400">
                <Input {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormLabel>Description</FormLabel>
        <Textarea
          className="resize-none overflow-hidden p-2 w-full border-neutral-400"
          rows={3}
        />

        <FormField
          control={form.control}
          name="techStack"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tech Stack</FormLabel>
              <FormControl className="border-neutral-400">
                <Input {...field} autoComplete="off" />
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
              <FormControl className="border-neutral-400">
                <Input {...field} autoComplete="off" />
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
              <FormControl className="border-neutral-400">
                <Input {...field} autoComplete="off" />
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
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                  className="border-neutral-400"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">
          Submit
        </Button>
      </form>
    </Form>
  );
}
