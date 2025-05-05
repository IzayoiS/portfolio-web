"use client";

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
import { Textarea } from "@/components/ui/textarea";
import {
  formExpSchema,
  FormExpSchemaDTO,
} from "@/utils/schemas/experience.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

export default function NewExperience() {
  const form = useForm<FormExpSchemaDTO>({
    resolver: zodResolver(formExpSchema),
    defaultValues: {
      company: "",
      role: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      isCurrentlyWorking: false,
      descriptions: [""],
      logo: null,
    },
  });

  const { watch, setValue } = form;
  const isCurrentlyWorking = watch("isCurrentlyWorking");
  const descriptions = watch("descriptions");

  const handleAddDescription = () => {
    setValue("descriptions", [...descriptions, ""]);
  };

  const handleRemoveDescription = (index: number) => {
    setValue(
      "descriptions",
      descriptions.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data: FormExpSchemaDTO) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl className="border-neutral-400">
                <Input {...field} autoComplete="off" />
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
              <FormLabel>Role</FormLabel>
              <FormControl className="border-neutral-400">
                <Input {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isCurrentlyWorking"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-neutral-400"
                />
              </FormControl>
              <FormLabel>Currently Working</FormLabel>
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
                  <FormControl className="border-neutral-400">
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-black text-zinc-100 border-neutral-700">
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  <FormControl className="border-neutral-400">
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-black text-zinc-100 border-neutral-700">
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    <FormControl className="border-neutral-400">
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-black text-zinc-100 border-neutral-700">
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    <FormControl className="border-neutral-400">
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-black text-zinc-100 border-neutral-700">
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="space-y-2">
          <FormLabel>Description</FormLabel>
          {descriptions.map((desc, index) => (
            <div key={index} className="flex gap-2 items-start">
              <Textarea
                value={desc}
                className="border rounded resize-none w-full pl-1"
                rows={2}
                onChange={(e) => {
                  const newDesc = [...descriptions];
                  newDesc[index] = e.target.value;
                  setValue("descriptions", newDesc);
                }}
              />
              {index > 0 && (
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => handleRemoveDescription(index)}
                  className="cursor-pointer"
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            onClick={handleAddDescription}
            variant="secondary"
            className="cursor-pointer"
          >
            Add Description
          </Button>
        </div>

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
