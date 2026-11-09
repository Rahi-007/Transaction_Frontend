"use client";

import CategoryTable from "./CategoryTable";
import TableSkeleton from "@/components/common/TableSkeleton";
import { useGetAllCategoriesQuery } from "@/service/category.service";

const Page = () => {
  const { data, isLoading } = useGetAllCategoriesQuery();

  return (
    <div className="px-1 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
      {isLoading ? <TableSkeleton /> : <CategoryTable data={data ?? []} />}
    </div>
  );
};

export default Page;
