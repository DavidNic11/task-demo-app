"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"

export function TaskFilters() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>Todo</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>In Progress</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Review</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Done</DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Priority</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>High</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Medium</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Low</DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Assignee</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>Alice Johnson</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Bob Smith</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Carol Davis</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>David Wilson</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
