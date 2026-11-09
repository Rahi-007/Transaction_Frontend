"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { zodResolver } from "@hookform/resolvers/zod";
import { ITransition } from "@/interface/transaction.interface";
import { useAddTransitionMutation, useDeleteTransitionMutation, useUpdateTransitionMutation } from "@/service/user.service";
import toast from "react-hot-toast";
import GButton from "@/components/common/GButton";
import GInput from "@/components/common/GInput";

const TransitionSchema = z.object({
  transactionDate: z.string().min(1, "Transaction date is Required"),
  amount: z.number().min(1, { message: "Amount is Required" }),
  categoryId: z.string({ message: "Category is Required" }),
  remark: z.string().optional(),
});

type TransitionFormValues = z.infer<typeof TransitionSchema>;

interface IProps {
  title?: string;
  defaultValues?: ITransition;
}

const TransitionForm = (props: IProps) => {
  const [addTransition] = useAddTransitionMutation();
  const [updateTransition] = useUpdateTransitionMutation();
  const [handleDelete] = useDeleteTransitionMutation();

  const form = useForm<TransitionFormValues>({
    resolver: zodResolver(TransitionSchema),
    defaultValues: {
      transactionDate: props.defaultValues?.transactionDate,
      categoryId: props.defaultValues?.category.id,
      remark: props.defaultValues?.remark || "",
      amount: props.defaultValues?.amount,
    },
  });

  const onSubmit = async (values: TransitionFormValues) => {
    try {
      if (props.defaultValues) {
        await updateTransition({ id: props.defaultValues.id, data: values }).unwrap();
        toast.success("Client updated successful");
      } else {
        await addTransition(values).unwrap();
        form.reset();
        toast.success("Client added successful");
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
        <h2 className="text-2xl font-bold">{props.title ?? "Client Form"}</h2>
      </div>

      <div className="grid gap-y-1 gap-x-4 px-3 sm:px-8 py-4 sm:py-6 md:grid-cols-2 xl:grid-cols-3">

        <div className="md:col-span-2 xl:md:col-span-3">
          <GInput.Form name="remark" label="Remark" control={form.control} placeholder="Address" />
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
                  toast.success("Transition deleted successfully");
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

export default TransitionForm;
