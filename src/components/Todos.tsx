// SHADCN UI COMPONENTS
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../@/components/ui/tabs"
import { Button } from "../../@/components/ui/button"

// ICONS
import { Moon, ListTodo, CircleCheck, RotateCwFadingClock, Plus, Sun } from "lucide-react"

// COMPONENTS
import Todo from "./Todo"
import { EmptyAll, EmptyCompleted, EmptyPending } from "./Empty"
import { NewTodoDialog, EditTodoDialog, DeleteTodoDialog, TodoCard } from "./Dialogs"


// REDUX TOOLKIT
import { useDispatch, useSelector } from "react-redux"


// REACT HOOKS
import { useEffect } from "react"


// TODOS SLICE STATES
import { dialogsControl, emptyStatesControl, getStoredData, selectEmptyStates, selectTheme, selectTodosList, themeToggle } from "@/features/TodoSlice"


function Todos() {

  const dispatch = useDispatch()
  const todos = useSelector(selectTodosList)
  const theme = useSelector(selectTheme)
  const emptyStates = useSelector(selectEmptyStates)
  const allTodos = todos
  const completedTodos = todos.filter((t) => t.isCompleted)
  const pendingTodos = todos.filter((t) => !t.isCompleted)


  useEffect(() => {
    dispatch(emptyStatesControl({ emptyType: 'completed_empty', isOpen: completedTodos.length === 0 }))
    dispatch(emptyStatesControl({ emptyType: 'pending_empty', isOpen: pendingTodos.length === 0 }))
    dispatch(emptyStatesControl({ emptyType: 'all_empty', isOpen: todos.length === 0 }))
  }, [completedTodos.length, pendingTodos.length, todos.length])

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove(theme === 'light' ? 'dark' : 'light')
    root.classList.add(theme)
  }, [theme])


  useEffect(() => {
    dispatch(getStoredData())
  }, [])

  return (
    <div className="w-full h-screen p-4">
      <Tabs defaultValue="all" className="w-full h-full flex flex-col">
        <div className="flex items-center justify-between shrink-0">
          <div className="flex">
            <TodoCard />
            <DeleteTodoDialog />
            <EditTodoDialog />
            <NewTodoDialog />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { dispatch(dialogsControl({dialogType: 'new_todo', isOpen: true})) }}
            >
              <Plus />
            </Button>
          </div>
          <TabsList>
            <TabsTrigger value="all"><ListTodo /></TabsTrigger>
            <TabsTrigger value="completed"><CircleCheck /></TabsTrigger>
            <TabsTrigger value="pending"><RotateCwFadingClock /></TabsTrigger>
          </TabsList>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => { dispatch(themeToggle()) }} 
          >
            {theme === 'light' && <Moon />}
            {theme === 'dark' && <Sun />}
          </Button>
        </div>
        <TabsContent value="all" className="flex-1 min-h-0 mt-2">
          <Card className="w-full h-full flex flex-col gap-0">
            <CardHeader className="px-0 mx-6 mb-0 border-b shrink-0">
              <CardTitle>All</CardTitle>
              <CardDescription>
                View and manage all your projects and tasks. Review your
                accomplishments and analyze your productivity.
              </CardDescription>
            </CardHeader>
            <CardContent className="ml-6 py-6 pr-5 pl-0.5 flex-1 min-h-0 overflow-y-scroll scrollbar-thin scrollbar-thumb-accent">
              {emptyStates.allEmptyState.isOpen && <EmptyAll />}
              {allTodos.map((t, idx) => (
                <Todo key={t.id ?? idx} todo={t} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="flex-1 min-h-0 mt-2">
          <Card className="w-full h-full flex flex-col gap-0">
            <CardHeader className="px-0 mx-6 mb-0 border-b shrink-0">
              <CardTitle>Completed</CardTitle>
              <CardDescription>
                View and manage all your completed projects and tasks. Review your
                accomplishments and analyze your productivity.
              </CardDescription>
            </CardHeader>
            <CardContent className="ml-6 py-6 pr-5 pl-0.5 flex-1 min-h-0 overflow-y-scroll scrollbar-thin scrollbar-thumb-accent">
              
              {emptyStates.completedEmptyState.isOpen && <EmptyCompleted />}
              {completedTodos.map((t, idx) => (
                <Todo key={t.id ?? idx} todo={t} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="flex-1 min-h-0 mt-2">
          <Card className="w-full h-full flex flex-col gap-0">
            <CardHeader className="px-0 mx-6 mb-0 border-b shrink-0">
              <CardTitle>Pending</CardTitle>
              <CardDescription>
                View and manage all your pending projects and tasks. Prioritize your
                work and ensure nothing falls through the cracks.
              </CardDescription>
            </CardHeader>
            <CardContent className="ml-6 py-6 pr-5 pl-0.5 flex-1 min-h-0 overflow-y-scroll scrollbar-thin scrollbar-thumb-accent">
              
              {emptyStates.pendingEmptyState.isOpen && <EmptyPending />}
              {pendingTodos.map((t, idx) => (
                <Todo key={t.id ?? idx} todo={t} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}



export default Todos