import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddTechStack } from "@/hooks/use-tech";
import {
  formTechSchema,
  FormTechSchemaDTO,
} from "@/utils/schemas/tech.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";

export default function AddTechStack() {
  const form = useForm<FormTechSchemaDTO>({
    resolver: zodResolver(formTechSchema),
    defaultValues: {
      name: "",
      icon: null,
    },
  });

  const { mutate, isPending } = useAddTechStack();

  const onSubmit = (data: FormTechSchemaDTO) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.icon) {
      formData.append("icon", data.icon);
    }

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
        className="bg-black rounded shadow flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
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

        <Button
          type="submit"
          className="cursor-pointer py-2 rounded"
          disabled={isPending}
        >
          {isPending ? (
            <TailSpin visible={true} height={25} width={25} color="#fff" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
