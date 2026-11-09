"use client";

import { ColDef } from "ag-grid-community";
import { useDeleteTransitionMutation } from "@/service/user.service";
import { createActionColumn } from "@/components/layout/AgGridActionColumn";
import { ITransition } from "@/interface/transaction.interface";
import DataTable from "@/components/common/DataTable";

interface IProps {
  data: ITransition[];
}

export default function TransitionTable({ data }: IProps) {
  const [deleteTransition] = useDeleteTransitionMutation();
  const actionColumn = createActionColumn<ITransition>({
    editUrl: transition => `/transition/${transition.id}`,
    onDelete: transition => deleteTransition(transition.id).unwrap(),
    deleteSuccessMessage: "Transition deleted successfully",
  });

  const columnDefs: ColDef<ITransition>[] = [
    {
      headerName: "ID",
      field: "id",
      sortable: false,
      flex: 1,
    },
    {
      headerName: "Transition Date",
      field: "transactionDate",
      valueFormatter: params => {
        if (!params.value) return "-";

        const date = new Date(params.value);
        return `${date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        })}, ${date.getFullYear()}`;
      },
      width: 100,
    },
    {
      headerName: "Category Name",
      field: "category.name",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Category Type",
      field: "category.type",
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
