// SHADCN UI COMPONENTS
import { Card, CardTitle } from "../../@/components/ui/card"
import { Checkbox } from "../../@/components/ui/checkbox"
import { Separator } from "../../@/components/ui/separator"
import { Button } from "../../@/components/ui/button"
import { Pencil, Trash, SquareArrowOutUpRight } from "lucide-react"


// REDUX TOOLKIT
import { useDispatch } from "react-redux"
import { checkTodo, dialogsControl, getVideoThumbnail, setSelectedTodoId } from "@/features/TodoSlice"

// TYPES
type TodoObjectType = {
  todo: {
    id: string,
    title: string,
    description: string,
    link: string,
    isCompleted: boolean,
    date: string,
    time: string,
  }
}

function Todo({ todo }: TodoObjectType) {

  const dispatch = useDispatch()


  return (
    <>
      <Card className="p-2 pl-3 flex-row items-center justify-between rounded-lg shrink-0">
        <div className="flex gap-3 items-center w-3/5">
          <Checkbox
            className="size-7 rounded-sm"
            checked={todo.isCompleted}
            onCheckedChange={() => { dispatch(checkTodo({id: todo.id})) }}
          />
          <Separator orientation="vertical"/>
          <CardTitle className={`w-full overflow-hidden text-ellipsis text-nowrap ${todo.isCompleted ? 'line-through' : ''}`}>
            {todo.title}
          </CardTitle>
        </div>
        <div className="flex gap-1 ">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open"
            onClick={() => { 
              dispatch(setSelectedTodoId({id: todo.id}));
              dispatch(dialogsControl({
                dialogType: 'open_todo',
                isOpen: true,
                cardData: todo,
              }));
              dispatch(getVideoThumbnail());
            }}
          >
            <SquareArrowOutUpRight />
          </Button>

          <Button 
            variant="ghost"
            size="icon"
            aria-label="Edit"
            onClick={() => { 
              dispatch(setSelectedTodoId({id: todo.id}));
              dispatch(dialogsControl({ 
                dialogType: 'open_edit_todo',
                isOpen: true,
                editTodoInputs: { 
                  title: todo.title,
                  description: todo.description,
                  link: todo.link,
                 } 
                })) 
              }}
          >
            <Pencil />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Delete"
            onClick={() => { 
              dispatch(setSelectedTodoId({id: todo.id}));
              dispatch(dialogsControl({ dialogType: 'delete_todo', isOpen: true }))
            }}
          >
            <Trash />
          </Button>
        </div>
      </Card>
    </>
  )
}


export default Todo