'use client'

import { useState } from 'react'
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState
} from '@tanstack/react-table'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { DataTableBody } from '@/components/ui/datatable/data-table-body'
import { DataTableHeaders } from '@/components/ui/datatable/data-table-headers'
import { DataTablePagination } from '@/components/ui/datatable/data-table-pagination'

const DataTable = <T,>({ data, columns }: { data: T[]; columns: ColumnDef<T>[] }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 8
      }
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div className='w-full'>
      <DataTableHeaders table={table} />
      <DataTableBody columns={columns} table={table} />
      <DataTablePagination table={table} />
    </div>
  )
}

export { DataTable }
