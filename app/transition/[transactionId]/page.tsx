"use client";

import ClientForm from "../add/TransactionForm";
import { useParams } from "next/navigation";
import { useGetTransitionByIdQuery } from "@/service/user.service";
import FormSkeleton from "@/components/layout/FormSkeleton";

const Page = () => {
  const { transitionId } = useParams<{ transitionId: string }>();
  const { data: transition, isLoading } = useGetTransitionByIdQuery(transitionId);

  return (
    <div className="px-2 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
      {isLoading ? (
        <FormSkeleton field={5} narration={true} />
      ) : (
        <ClientForm defaultValues={transition} title={transition?.id} />
      )}
    </div>
  );
};

export default Page;
