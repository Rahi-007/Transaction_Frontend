"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } from "@/service/category.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICategory } from "@/interface/category.interface";
import GButton from "@/components/common/GButton";
import GInput from "@/components/common/GInput";
import toast from "react-hot-toast";

const CategorySchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 4 characters" }),
  type: z.number({ message: "Type is Required" }),
  remark: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof CategorySchema>;

interface IProps {
  title?: string;
  defaultValues?: ICategory;
}

const CategoryForm = (props: IProps) => {
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [handleDelete] = useDeleteCategoryMutation();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: props.defaultValues?.name,
      type: props.defaultValues?.type,
      remark: props.defaultValues?.remark,
    },
  });

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      if (props.defaultValues) {
        await updateCategory({ id: props.defaultValues.id, data: values }).unwrap();
        toast.success("Category updated successful");
      } else {
        await addCategory(values).unwrap();
        form.reset();
        toast.success("Category added successful");
      }
    } catch (err) {
      const error = err as FetchBaseQueryError & {
        data?: { message?: string };
      };
      toast.error(error.data?.message ?? "Something went wrong");
    }
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-xl md:rounded-2xl border bg-white shadow-sm">
      <div className="border-b px-3 sm:px-8 py-4 sm:py-6">
        <h2 className="text-2xl font-bold">{props.title ?? "Category Form"}</h2>
      </div>

      <div className="grid gap-y-1 gap-x-4 px-3 sm:px-8 py-4 sm:py-6 md:grid-cols-2">
        <GInput.Form name="name" label="Name" control={form.control} placeholder="John" required />
        <GInput.Form name="type" label="Type" control={form.control} placeholder="Income" required />

        <div className="md:col-span-2">
          <GInput.Form name="remark" label="Remark" control={form.control} placeholder="Remark" />
        </div>
      </div>

      <div className="flex justify-center sm:justify-end rounded-b-2xl gap-1 sm:gap-3 border-t bg-slate-50 px-8 py-4 sm:py-5">
        {props.defaultValues ? (
          <>
            <GButton
              action="delete"
              type="button"
              onClick={async () => {
                if (!props.defaultValues?.id) return;

                try {
                  await handleDelete(props.defaultValues?.id).unwrap();
                  toast.success("Client deleted successfully");
                } catch (err) {
                  const error = err as FetchBaseQueryError & {
                    data?: { message?: string };
                  };
                  toast.error(error.data?.message ?? "Something went wrong");
                }
              }}
            />
            <GButton action="update" type="submit" loading={form.formState.isSubmitting} />
          </>
        ) : (
          <>
            <GButton action="reset" type="reset" onClick={() => form.reset()} />
            <GButton action="add" type="submit" loading={form.formState.isSubmitting} />
          </>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
