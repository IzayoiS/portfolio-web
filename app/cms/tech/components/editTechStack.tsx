import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateTechStack } from "@/hooks/use-tech";
import {
  formTechSchema,
  FormTechSchemaDTO,
} from "@/utils/schemas/tech.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";

export interface TechType {
  id: number;
  name: string;
  icon: string;
}

interface EditTechProps {
  tech: TechType;
  onClose: () => void;
}

export default function EditTechStack({ tech, onClose }: EditTechProps) {
  const form = useForm<FormTechSchemaDTO>({
    resolver: zodResolver(formTechSchema),
    defaultValues: {
      name: tech.name,
      icon: null,
    },
  });

  const { mutate, isPending } = useUpdateTechStack();

  const onSubmit = (data: FormTechSchemaDTO) => {
    const formData = new FormData();
    formData.append("name", data.name);

    const userId = localStorage.getItem("userId");
    if (userId) formData.append("user_id", userId);

    if (data.icon instanceof File) {
      formData.append("icon", data.icon);
    } else if (tech.icon) {
      formData.append("icon_url", tech.icon);
    }

    mutate(
      { id: tech.id, formData },
      {
        onSuccess: () => {
          onClose();
          toast("Tech updated successfully");
        },
        onError: (error) => {
          console.error("Error updating tech:", error);
          toast("Failed to update tech");
        },
      }
    );
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
