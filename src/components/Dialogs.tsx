// SHADCN UI COMPONENTS
import { Button } from "../../@/components/ui/button"
import { Badge } from "../../@/components/ui/badge"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../@/components/ui/alert-dialog"
import { Textarea } from "../../@/components/ui/textarea"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "../../@/components/ui/field"
import { Input } from "../../@/components/ui/input"
import { Label } from "../../@/components/ui/label"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card"
import { Spinner } from "../../@/components/ui/spinner"


// ICONS
import { CircleCheck, RotateCwFadingClock, Trash2Icon, ImageOff } from "lucide-react"


// REDUX TOOLKIT
import { useDispatch, useSelector } from "react-redux"

// SLICE STATES
import { createNewTodo, deleteTodo, dialogsControl, editTodo, handleInputsChange, onThumbnailLoad, selectDeleteTodoDialog, selectEditTodoDialog, selectNewTodoDialog, selectTodoCard } from "@/features/TodoSlice"


export function NewTodoDialog() {

  const dispatch = useDispatch()

  const newTodoDialog = useSelector(selectNewTodoDialog)



  return (
    <Dialog
      open={newTodoDialog.isOpen}
      onOpenChange={() => { dispatch(dialogsControl({dialogType: 'new_todo', isOpen: !newTodoDialog.isOpen})) }}>
      <form>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>New Todo</DialogTitle>
            <DialogDescription>
              Add a new todo, include the important details, and save it to keep your plans organized.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field data-invalid={newTodoDialog.errorLabels.titleField.isOpen}>
              {newTodoDialog.errorLabels.titleField.isOpen && <FieldLabel htmlFor="title-1">{newTodoDialog.errorLabels.titleField.errorMessage}</FieldLabel>}
              {!newTodoDialog.errorLabels.titleField.isOpen && <Label htmlFor="title-1">Title<span className="text-destructive">*</span></Label>}
              <Input
                id="title-1"
                name="title" 
                required 
                aria-invalid={newTodoDialog.errorLabels.titleField.isOpen}
                value={newTodoDialog.titleInput} 
                onChange={(e) => { dispatch(handleInputsChange({ inputType: 'new_todo_title', inputData: e.target.value })) }}
              />
              <FieldDescription>
                Title must be 5 charecters or more.
              </FieldDescription>
            </Field>
             <Field>
              <Label htmlFor="textarea-description">Description</Label>
              <Textarea
                id="textarea-description" 
                placeholder="Describe what you should do in this todo." 
                className="max-h-32 scrollbar-thin scrollbar-thumb-accent"
                value={newTodoDialog.descriptionInput} 
                onChange={(e) => { dispatch(handleInputsChange({ inputType: 'new_todo_description', inputData: e.target.value })) }}
              />
            </Field>
            <Field data-invalid={newTodoDialog.errorLabels.linkField.isOpen}>
              {newTodoDialog.errorLabels.linkField.isOpen && <FieldLabel htmlFor="title-1">{newTodoDialog.errorLabels.linkField.errorMessage}</FieldLabel>}
              {!newTodoDialog.errorLabels.linkField.isOpen && <Label htmlFor="link-1">Links</Label>}
              <Input
                id="link-1" 
                name="link" 
                placeholder="https://www.youtube.com"
                aria-invalid={newTodoDialog.errorLabels.linkField.isOpen}
                value={newTodoDialog.linkInput}
                onChange={(e) => { dispatch(handleInputsChange({ inputType: 'new_todo_link', inputData: e.target.value })) }}
              />
              <FieldDescription>
                Type or past a long YouTube video URL here.
              </FieldDescription>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button
              type="submit"
              onClick={() => { dispatch(createNewTodo()) }}
              disabled={newTodoDialog.disableAddButton}
            >Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}


export function EditTodoDialog() {

  const dispatch = useDispatch()

  const editTodoDialog = useSelector(selectEditTodoDialog)

  return (
    <Dialog 
      open={editTodoDialog.isOpen}
      onOpenChange={() => { dispatch(dialogsControl({ dialogType: 'close_edit_todo', isOpen: !editTodoDialog.isOpen })) }}
    >
      <form>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogDescription>
              Update this todo with any changes and save when you&apos;re ready.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field data-invalid={editTodoDialog.errorLabels.titleField.isOpen}>
              {editTodoDialog.errorLabels.titleField.isOpen && <FieldLabel htmlFor="updated-title-1">{editTodoDialog.errorLabels.titleField.errorMessage}</FieldLabel>}
              {!editTodoDialog.errorLabels.titleField.isOpen && <Label htmlFor="updated-title-1">Title</Label>}
              <Input
                id="name-1"
                aria-invalid={editTodoDialog.errorLabels.titleField.isOpen}
                name="name"
                onChange={(e) => { dispatch(handleInputsChange({ 
                    inputType: 'updated_todo_title',
                    inputData: e.target.value
                  })) 
                }}
                value={editTodoDialog.updatedTitleInput}
              />
              <FieldDescription>
                Title must be 5 charecters or more.
              </FieldDescription>
            </Field>
             <Field>
              <Label htmlFor="textarea-message">Description</Label>
              <Textarea
                id="textarea-message"
                placeholder="Describe what you should do in thi todo."
                className="max-h-32 scrollbar-thin scrollbar-thumb-accent"
                onChange={(e) => { dispatch(handleInputsChange({ 
                    inputType: 'updated_todo_description',
                    inputData: e.target.value
                  })) 
                }}
                value={editTodoDialog.updatedDescriptionInput}
              />
            </Field>
            <Field data-invalid={editTodoDialog.errorLabels.linkField.isOpen}>
              {editTodoDialog.errorLabels.linkField.isOpen && <FieldLabel htmlFor="updated-link-1">{editTodoDialog.errorLabels.linkField.errorMessage}</FieldLabel>}
              {!editTodoDialog.errorLabels.linkField.isOpen && <Label htmlFor="updated-link-1">Links</Label>}
              <Input
                id="updated-link-1"
                name="link"
                placeholder="https://www.youtube.com"
                aria-invalid={editTodoDialog.errorLabels.linkField.isOpen}
                onChange={(e) => { dispatch(handleInputsChange({ 
                    inputType: 'updated_todo_link',
                    inputData: e.target.value
                  })) 
                }}
                value={editTodoDialog.updatedLinkInput}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Discard</Button>} />
            <Button
              type="submit"
              onClick={() => { dispatch(editTodo()) }}
              disabled={editTodoDialog.disableSaveButton}
            >Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}



export function DeleteTodoDialog() {

  const dispatch = useDispatch()

  const deleteTodoDialog = useSelector(selectDeleteTodoDialog)

  return (
    <AlertDialog 
      open={deleteTodoDialog.isOpen}
      onOpenChange={() => { dispatch(dialogsControl({ dialogType: 'delete_todo', isOpen: !deleteTodoDialog.isOpen })) }}
    >
      <AlertDialogTrigger
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Todo?</AlertDialogTitle>
          <AlertDialogDescription>
            This action permanently removes this todo from your list, are you sure?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            variant="outline"
            onClick={() => { dispatch(dialogsControl({ dialogType: 'delete_todo', isOpen: !deleteTodoDialog.isOpen })) }}
          >
            Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => { dispatch(deleteTodo()) }}
          >Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


export function TodoCard() {

  const dispatch = useDispatch()

  const todoCard = useSelector(selectTodoCard)

  return (
    <Dialog
      open={todoCard.isOpen}
      onOpenChange={() => {dispatch(dialogsControl({ dialogType: 'close_todo', isOpen: !todoCard.isOpen  }))}}
    >
      <DialogContent className="w-lg p-0 [&>button:last-child]:hidden">
        <Card className="relative mx-auto w-full max-w-lg pt-0 border-none gap-0">
          {todoCard.videoCover.isOpen && (
            <div className="relative z-20 flex aspect-video rounded-none w-full items-center justify-center overflow-hidden bg-muted/40">
              {todoCard.videoCover.alternative.isOpen && <ImageOff className="h-12 w-12 text-muted-foreground" />}
              {todoCard.videoCover.thumbnail.url && (
                <img
                  src={todoCard.videoCover.thumbnail.url}
                  alt={todoCard.cardData.title ?? 'Video thumbnail'}
                  onLoad={() => dispatch(onThumbnailLoad())}
                  className="relative z-20 h-full w-full object-cover rounded-none"
                />
              )}
              {todoCard.videoCover.skeleton.isOpen && <Spinner className="size-8 mr-52" />}
            </div>
          )}

          <CardHeader className="overflow-auto max-h-44 scrollbar-thin scrollbar-thumb-accent ring-0 p-6">
            <div className="flex justify-between">
              <Badge variant="secondary">
                {todoCard.cardData.isCompleted && <CircleCheck />}
                {!todoCard.cardData.isCompleted && <RotateCwFadingClock />}
              </Badge>

              <div className="flex gap-1">
                <Badge variant="secondary">
                  {todoCard.cardData.time}
                </Badge>
                <Badge variant="secondary">
                  {todoCard.cardData.date}
                </Badge>
              </div>
            </div>
            <CardTitle className="flex flex-col max-w-full">
              {todoCard.cardData.title}
            </CardTitle>
            <CardDescription className="break-all">
              {todoCard.cardData.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="gap-2">
            <Button
              className="ml-auto"
              variant="outline"
              onClick={() => { dispatch(dialogsControl({ dialogType: 'close_todo', isOpen: !todoCard.isOpen })) }}
            >Close</Button>

            {todoCard.cardData.link && (
              <Button
                onClick={() => {
                  window.open(todoCard.cardData.link ?? '', '_blank', 'noopener,noreferrer')
                }}
              >Watch</Button>
            )}
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
