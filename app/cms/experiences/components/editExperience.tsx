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
      startMonth: experience.start_month,
      startYear: experience.start_year,
      endMonth: experience.currenly_working ? "" : experience.end_month,
      endYear: experience.currenly_working ? "" : experience.end_year,
      isCurrentlyWorking: experience.currenly_working,
      descriptions: experience.descriptions || [""],
      logo: undefined,
    },
  });

  const { mutate, isPending } = useUpdateExperience();

  const onSubmit = (data: FormExpSchemaDTO) => {
    const formData = new FormData();

    formData.append("company", data.company);
    formData.append("role", data.role);
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
    formData.append("currently_working", String(data.isCurrentlyWorking));

    data.descriptions.forEach((desc, index) => {
      formData.append(`descriptions[${index}]`, desc);
    });

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
          name="isCurrentlyWorking"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <FormControl>
                <input
                  type="checkbox"
                  id="currentlyWorking"
                  checked={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormLabel htmlFor="currentlyWorking" className="text-md">
                I am currently working in this role
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4">
          <label className="text-md">Start Date *</label>
          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="startMonth"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <select
                      {...field}
                      className="border p-1 rounded w-full bg-slate-800 text-white"
                    >
                      <option value="">Month</option>
                      {[
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
                      ].map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startYear"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <select
                      {...field}
                      className="border p-1 rounded w-full bg-slate-800 text-white"
                    >
                      <option value="">Year</option>
                      {Array.from(
                        { length: 50 },
                        (_, i) => new Date().getFullYear() - i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <label className="text-md">End Date *</label>
          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="endMonth"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <select
                      {...field}
                      className="border p-1 rounded w-full bg-slate-800 text-white disabled:bg-slate-600 disabled:text-slate-400"
                      disabled={form.watch("isCurrentlyWorking")}
                    >
                      <option value="">Month</option>
                      {[
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
                      ].map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endYear"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <select
                      {...field}
                      className="border p-1 rounded w-full bg-slate-800 text-white disabled:bg-slate-600 disabled:text-slate-400"
                      disabled={form.watch("isCurrentlyWorking")}
                    >
                      <option value="">Year</option>
                      {Array.from(
                        { length: 50 },
                        (_, i) => new Date().getFullYear() - i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

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
                  <Plus />
                </Button>
              </div>

              {(field.value || []).map((desc: string, index: number) => (
                <div key={index} className="flex items-center gap-2 mt-2">
                  <Textarea
                    className="border rounded resize-none w-full pl-1"
                    rows={2}
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
                    <Trash2 />
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
                  className="bg-slate-800 h-10 p-2 cursor-pointer rounded"
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
