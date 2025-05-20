import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpType, useUpdateExperience } from "@/hooks/use-experience";
import {
  formExpSchema,
  FormExpSchemaDTO,
} from "@/utils/schemas/experience.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i);

interface EditExperienceProps {
  experience: ExpType;
  onClose: () => void;
}

export default function EditExperience({
  experience,
  onClose,
}: EditExperienceProps) {
  const form = useForm({
    resolver: zodResolver(formExpSchema),
    defaultValues: {
      company: experience.company,
      role: experience.role,
      techStack: experience.tech_stack,
      startMonth: experience.start_month,
      startYear: experience.start_year,
      endMonth: experience.currently_working ? "" : experience.end_month,
      endYear: experience.currently_working ? "" : experience.end_year,
      isCurrentlyWorking: experience.currently_working,
      descriptions: experience.descriptions || [""],
      logo: undefined,
    },
  });

  const { watch } = form;
  const isCurrentlyWorking = watch("isCurrentlyWorking");
  const { mutate, isPending } = useUpdateExperience();

  const onSubmit = (data: FormExpSchemaDTO) => {
    const formData = new FormData();

    formData.append("company", data.company);
    formData.append("role", data.role);
    formData.append("tech_stack", data.techStack);
    formData.append("start_month", data.startMonth);
    formData.append("start_year", data.startYear);
    formData.append(
      "end_month",
      data.isCurrentlyWorking ? "" : data.endMonth || ""
    );
    formData.append(
      "end_year",
      data.isCurrentlyWorking ? "" : data.endYear || ""
    );
    formData.append("isCurrentlyWorking", String(data.isCurrentlyWorking));
    formData.append("descriptions", JSON.stringify(data.descriptions));

    if (data.logo) {
      formData.append("logo", data.logo);
    }

    mutate(
      { id: experience.id, formData },
      {
        onSuccess: () => {
          toast("Experience updated successfully!");
          onClose();
        },
        onError: (error) => {
          toast("Failed to update experience. Please try again.");
          console.error(error);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-black text-zinc-100 rounded shadow flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company *</FormLabel>
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role *</FormLabel>
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
          name="techStack"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tech Stack (comma separated)</FormLabel>
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
          name="isCurrentlyWorking"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox
                  id="currentlyWorking"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-neutral-400"
                />
              </FormControl>
              <FormLabel htmlFor="currentlyWorking">
                Currently Working
              </FormLabel>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Month</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-neutral-400">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-black text-zinc-100">
                    {months.map((month) => (
                      <SelectItem
                        key={month}
                        value={month}
                        className="hover:bg-neutral-700 cursor-pointer"
                      >
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Year</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-neutral-400">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-black text-zinc-100">
                    {years.map((year) => (
                      <SelectItem
                        key={year}
                        value={year.toString()}
                        className="hover:bg-neutral-700 cursor-pointer"
                      >
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {!isCurrentlyWorking && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="endMonth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Month</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-neutral-400">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-black text-zinc-100">
                      {months.map((month) => (
                        <SelectItem
                          key={month}
                          value={month}
                          className="hover:bg-neutral-700 cursor-pointer"
                        >
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Year</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-neutral-400">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-black text-zinc-100">
                      {years.map((year) => (
                        <SelectItem
                          key={year}
                          value={year.toString()}
                          className="hover:bg-neutral-700 cursor-pointer"
                        >
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="descriptions"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormLabel>Description</FormLabel>
                <Button
                  type="button"
                  onClick={() => field.onChange([...(field.value || []), ""])}
                  className="text-white px-3 py-1 rounded"
                >
                  <Plus className="cursor-pointer" />
                </Button>
              </div>

              {(field.value || []).map((desc: string, index: number) => (
                <div key={index} className="flex items-center gap-2 mt-2">
                  <Input
                    className="border rounded resize-none w-full pl-1"
                    value={desc}
                    onChange={(e) => {
                      const updated = [...(field.value || [])];
                      updated[index] = e.target.value;
                      field.onChange(updated);
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      const updated = [...(field.value || [])];
                      updated.splice(index, 1);
                      field.onChange(updated);
                    }}
                  >
                    <Trash2 className="cursor-pointer" />
                  </Button>
                </div>
              ))}
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
                  className="h-10 p-2 cursor-pointer rounded"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="cursor-pointer text-white py-2 rounded mt-3"
          disabled={isPending}
        >
          {isPending ? <TailSpin height={20} width={20} /> : "Update"}
        </Button>
      </form>
    </Form>
  );
}
