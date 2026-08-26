import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../@/components/ui/empty"
import { Button } from "../../@/components/ui/button"
import { ListTodo, CircleCheck, RotateCwFadingClock, Plus } from "lucide-react"


// REDUX TOOLKIT
import { useDispatch } from "react-redux"
import { dialogsControl } from "@/features/TodoSlice"




export function EmptyAll() {
  
  const dispatch = useDispatch()

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ListTodo />
        </EmptyMedia>
        <EmptyTitle>No Todos</EmptyTitle>
        <EmptyDescription>No todos found</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={() => { dispatch(dialogsControl({dialogType: 'new_todo', isOpen: true})) }}>
          <Plus /> New
        </Button>
      </EmptyContent>
    </Empty>
  )
}


export function EmptyCompleted() {

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CircleCheck />
        </EmptyMedia>
        <EmptyTitle>No Completed Todos</EmptyTitle>
        <EmptyDescription>No todos found</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
      </EmptyContent>
    </Empty>
  )
}


export function EmptyPending() {

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RotateCwFadingClock />
        </EmptyMedia>
        <EmptyTitle>No Pending Todos</EmptyTitle>
        <EmptyDescription>No todos found</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
      </EmptyContent>
    </Empty>
  )
}