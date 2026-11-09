"use category";

import { ColDef } from "ag-grid-community";
import { ICategory } from "@/interface/category.interface";
import { createActionColumn } from "@/components/layout/AgGridActionColumn";
import { useDeleteCategoryMutation } from "@/service/category.service";
import DataTable from "@/components/common/DataTable";

interface IProps {
  data: ICategory[];
}

export default function CategoryTable({ data }: IProps) {
  const [deleteCategory] = useDeleteCategoryMutation();
  const actionColumn = createActionColumn<ICategory>({
    editUrl: category => `/category/${category.id}`,
    onDelete: category => deleteCategory(category.id).unwrap(),
    deleteSuccessMessage: "Category deleted successfully",
  });

  const columnDefs: ColDef<ICategory>[] = [
    {
      headerName: "ID",
      field: "id",
      sortable: false,
      flex: 1,
    },
    {
      headerName: "Category Name",
      field: "name",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Category Type",
      field: "type",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Remark",
      field: "remark",
      filter: true,
      flex: 1,
    },
    {
      headerName: "Created At",
      field: "createdAt",
      valueFormatter: params => {
        if (!params.value) return "-";

        const date = new Date(params.value);
        return `${date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        })}, ${date.getFullYear()}`;
      },
      flex: 1,
    },
    // ...actionColumn,
  ];

  return <DataTable rowData={data} columnDefs={columnDefs} />;
}
