"use client";

import ClientForm from "../add/CategoryForm";
import FormSkeleton from "../../../components/layout/FormSkeleton";
import { useGetCategoryByIdQuery } from "@/service/category.service";
import { useParams } from "next/navigation";

const Page = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { data: category, isLoading } = useGetCategoryByIdQuery(categoryId);

  return (
    <div className="px-2 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
      {isLoading ? (
        <FormSkeleton field={3} narration={true} />
      ) : (
        <ClientForm defaultValues={category} title={category?.name} />
      )}
    </div>
  );
};

export default Page;
