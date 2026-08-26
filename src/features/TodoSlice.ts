import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import { v4 as uuidv4 } from "uuid";
import { toast } from "../../@/components/ui/toast";
import moment from 'moment';



// TYPES

type Todo = {
  id: string;
  title: string;
  description: string;
  link: string;
  isCompleted: boolean;
  date: string;
  time: string;
};


type InitialTodosState = {
  storedData: {
    storedTodos: {
      name: 'stored_todos',
    }
  }
  todosApp: {
    theme: "light" | "dark";
    selectedTodoId: string | null;
    newTodoDialog: {
      isOpen: boolean;
      disableAddButton: boolean;
      errorLabels: {
        titleField: {
          isOpen: boolean;
          errorMessage: 'This title is already exist.';
        };
        linkField: {
          isOpen: boolean;
          errorMessage: 'Invalid youtube video link.';
        }
      }
      titleInput: string;
      descriptionInput?: string;
      linkInput?: string;
    };
    todoCard: {
      isOpen: boolean;
      videoCover: {
        isOpen: boolean;
        skeleton: {
          isOpen: boolean;
        };
        thumbnail: {
          isOpen: boolean;
          url: string | null;
        };
        alternative: {
          isOpen: boolean;
        };
      };
      cardData: {
        id: string | null;
        title: string | null;
        description?: string | null;
        link?: string | null;
        isCompleted: boolean
        date: string | null;
        time: string | null;
      }
    };
    editTodoDialog: {
      isOpen: boolean;
      disableSaveButton: boolean;
      errorLabels: {
        titleField: {
          isOpen: boolean;
          errorMessage: 'This title is already exist.';
        };
        linkField: {
          isOpen: boolean;
          errorMessage: 'Invalid youtube video link.';
        }
      }
      updatedTitleInput: string;
      updatedDescriptionInput: string;
      updatedLinkInput: string;
    };
    deleteTodoDialog: {
      isOpen: boolean;
    };
    emptyStates: {
      allEmptyState: {
        isOpen: boolean,
      },
      completedEmptyState: {
        isOpen: boolean,
      },
      pendingEmptyState: {
        isOpen: boolean,
      }
    };
  };
  todosList: Todo[];
};


type DialogsAction = 
  | {
      dialogType: 'new_todo' | 'delete_todo' | 'close_todo' | 'close_edit_todo',
      isOpen: boolean,
    }
  | {
    dialogType: 'open_todo';
      isOpen: boolean;
      cardData: Todo
    }
  | {
    dialogType: 'open_edit_todo';
      isOpen: boolean;
      editTodoInputs: Pick<Todo, 'title' | 'description' | 'link'>
  }


type TriggeredTodoId = {
  id: string
}


type InputsChangeAction = {
  inputType: 
  | 'new_todo_title' 
  | 'new_todo_description' 
  | 'new_todo_link' 
  | 'updated_todo_title' 
  | 'updated_todo_description' 
  | 'updated_todo_link'

  inputData: string
}


type EmptyStatesAction = {
  emptyType: 'all_empty' | 'completed_empty' | 'pending_empty',
  isOpen: boolean,
}


type CheckTodoAction = Pick<Todo, 'id'>


// INITIAL STATE
const initialState: InitialTodosState = {
  storedData: {
    storedTodos: {
      name: 'stored_todos',
    }
  },
  todosApp: {
    theme: 'light',
    selectedTodoId: null,
    newTodoDialog: {
      isOpen: false,
      disableAddButton: true,
      errorLabels: {
        titleField: {
          isOpen: false,
          errorMessage: 'This title is already exist.',
        },
        linkField: {
          isOpen: false,
          errorMessage: 'Invalid youtube video link.',
        },
      },
      titleInput: '',
      descriptionInput: '',
      linkInput: '',
    },
    todoCard: {
      isOpen: false,
      videoCover: {
        isOpen: false,
        skeleton: {
          isOpen: false,
        },
        thumbnail: {
          isOpen: false,
          url: null,
        },
        alternative: {
          isOpen: false,
        },
      },
      cardData: {
        id: null,
        isCompleted: false,
        title: null,
        description: null,
        link: null,
        date: null,
        time: null
      }
    },
    editTodoDialog: {
      isOpen: false,
      disableSaveButton: true,
      errorLabels: {
        titleField: {
          isOpen: false,
          errorMessage: 'This title is already exist.',
        },
        linkField: {
          isOpen: false,
          errorMessage: 'Invalid youtube video link.',
        },
      },
      updatedTitleInput: '',
      updatedDescriptionInput: '',
      updatedLinkInput: '',
    },
    deleteTodoDialog: {
      isOpen: false,
    },
    emptyStates: {
      allEmptyState: {
        isOpen: true,
      },
      completedEmptyState: {
        isOpen: true,
      },
      pendingEmptyState: {
        isOpen: true,
      },
    }
  },
  todosList: [],
};


const todosSlice = createSlice({
  name: 'todosList',
  initialState: initialState,
  reducers: {


    // GET STORED ITEMS
    getStoredData: (state) => {
      const storedData = localStorage.getItem(state.storedData.storedTodos.name)
      if (storedData) {
        state.todosList = JSON.parse(storedData)
      }
      else {
        toast.add({
          type: 'error',
          description: 'No stored data was found.'
        })
      }
    },

    // THEME TOGGLE

    themeToggle: (state) => {
      state.todosApp.theme = state.todosApp.theme === 'light' ? 'dark' : 'light'
    },


    // EMPTY STATE CONTROL
    emptyStatesControl: (state, action: PayloadAction<EmptyStatesAction>) => {
      switch (action.payload.emptyType) {
        case "all_empty":
          state.todosApp.emptyStates.allEmptyState.isOpen = action.payload.isOpen
          break
        case "completed_empty":
          state.todosApp.emptyStates.completedEmptyState.isOpen = action.payload.isOpen
          break
        case "pending_empty":
          state.todosApp.emptyStates.pendingEmptyState.isOpen = action.payload.isOpen
          break
      }
    },
    
    // DIALOGS CONTROL
    dialogsControl: (state, action: PayloadAction<DialogsAction>) => {
      switch (action.payload.dialogType) {
        case "new_todo":
          state.todosApp.newTodoDialog.isOpen = action.payload.isOpen;
          state.todosApp.newTodoDialog.titleInput = ''
          state.todosApp.newTodoDialog.descriptionInput = ''
          state.todosApp.newTodoDialog.linkInput = ''
          state.todosApp.newTodoDialog.disableAddButton = true
          state.todosApp.newTodoDialog.errorLabels.linkField.isOpen = false
          state.todosApp.newTodoDialog.errorLabels.titleField.isOpen = false
          break

        case "open_edit_todo":
          state.todosApp.editTodoDialog.disableSaveButton = true
          state.todosApp.editTodoDialog.isOpen = action.payload.isOpen;
          state.todosApp.editTodoDialog.updatedTitleInput = action.payload.editTodoInputs.title
          state.todosApp.editTodoDialog.updatedDescriptionInput = action.payload.editTodoInputs.description
          state.todosApp.editTodoDialog.updatedLinkInput = action.payload.editTodoInputs.link
          break
        
        case "delete_todo":
          state.todosApp.deleteTodoDialog.isOpen = action.payload.isOpen;
          break
        
        case "open_todo":
          state.todosApp.todoCard.isOpen = action.payload.isOpen;
          state.todosApp.todoCard.cardData = action.payload.cardData

          break

        case "close_todo":
          state.todosApp.todoCard.isOpen = action.payload.isOpen;
          break

        case "close_edit_todo":
          state.todosApp.editTodoDialog.isOpen = action.payload.isOpen;
          state.todosApp.editTodoDialog.errorLabels.linkField.isOpen = false
          state.todosApp.editTodoDialog.errorLabels.titleField.isOpen = false
          break

      }
    },

    // GET VIDEO THUMBNAIL
    getVideoThumbnail: (state) => {
      state.todosApp.todoCard.videoCover.thumbnail.isOpen = false
      state.todosApp.todoCard.videoCover.thumbnail.url = null
      state.todosApp.todoCard.videoCover.alternative.isOpen = false
      state.todosApp.todoCard.videoCover.skeleton.isOpen = false

      if (!state.todosApp.todoCard.cardData.link) {
        state.todosApp.todoCard.videoCover.isOpen = false
      }

      else {
        state.todosApp.todoCard.videoCover.isOpen = true
        state.todosApp.todoCard.videoCover.skeleton.isOpen = true

        const match = state.todosApp.todoCard.cardData.link.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)

        if (match) {
          const url = `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`
          state.todosApp.todoCard.videoCover.thumbnail.url = url
        }
        else {
          console.log('error with status codde 404>>>>')
          state.todosApp.todoCard.videoCover.skeleton.isOpen = false
          state.todosApp.todoCard.videoCover.alternative.isOpen = true
        }
      }
    },

    onThumbnailLoad: (state) => {
      state.todosApp.todoCard.videoCover.thumbnail.isOpen = true
      state.todosApp.todoCard.videoCover.skeleton.isOpen = false
    },

    // SET SELECTED TODO ID
    setSelectedTodoId: (state, action: PayloadAction<TriggeredTodoId>) => {
      state.todosApp.selectedTodoId = action.payload.id
    },


    handleInputsChange: (state, action: PayloadAction<InputsChangeAction>) => {
      switch (action.payload.inputType) {
        case "new_todo_title":
          state.todosApp.newTodoDialog.titleInput = action.payload.inputData
          if (state.todosApp.newTodoDialog.titleInput.length < 5) {
            state.todosApp.newTodoDialog.disableAddButton = true
          }
          else {
            if (state.todosApp.newTodoDialog.disableAddButton) {
              state.todosApp.newTodoDialog.disableAddButton = false
            }
          }
          break

        case "new_todo_description":
          state.todosApp.newTodoDialog.descriptionInput = action.payload.inputData
          break

        case "new_todo_link":
          state.todosApp.newTodoDialog.linkInput = action.payload.inputData
          break

        case "updated_todo_title":
          state.todosApp.editTodoDialog.updatedTitleInput = action.payload.inputData
          if (state.todosApp.editTodoDialog.updatedTitleInput.length < 5) {
            state.todosApp.editTodoDialog.disableSaveButton = true
          }
          else {
            if (state.todosApp.editTodoDialog.disableSaveButton) {
              state.todosApp.editTodoDialog.disableSaveButton = false
            }
          }
          break

        case "updated_todo_description":
          state.todosApp.editTodoDialog.updatedDescriptionInput = action.payload.inputData
          if (state.todosApp.editTodoDialog.updatedTitleInput.length < 5) {
            state.todosApp.editTodoDialog.disableSaveButton = true
          }
          else if (state.todosApp.editTodoDialog.disableSaveButton) {
            state.todosApp.editTodoDialog.disableSaveButton = false
          }
          break

        case "updated_todo_link":
          state.todosApp.editTodoDialog.updatedLinkInput = action.payload.inputData
          if (state.todosApp.editTodoDialog.updatedTitleInput.length < 5) {
            state.todosApp.editTodoDialog.disableSaveButton = true
          }
          else if (state.todosApp.editTodoDialog.disableSaveButton) {
            state.todosApp.editTodoDialog.disableSaveButton = false
          }
          break
      }
    },


    // CREATE NEW TODO
    createNewTodo: (state) => {

      // SAVE THE NEW TODO FUNCTION 
      const saveNewTodo = () => {

        const newTodoObject: Todo = {
          id: uuidv4(),
          title: state.todosApp.newTodoDialog.titleInput,
          description: state.todosApp.newTodoDialog.descriptionInput ?? '',
          link: state.todosApp.newTodoDialog.linkInput ?? '',
          isCompleted: false,
          date: moment().format('DD MMM YYYY'),
          time: moment().format('HH: mm'),
        }
  
        state.todosList.push(newTodoObject)
        
        // HIDE NEW TODO DIALOG
        state.todosApp.newTodoDialog.isOpen = false
  
        // DISPLAY TOAST
        toast.add({
          type: "success",
          description: "Todo has been created.",
        })
  
        // STOR TODOS LIST
        localStorage.setItem(state.storedData.storedTodos.name, JSON.stringify(state.todosList))

        // HIDE INVALID ERRO
        state.todosApp.newTodoDialog.errorLabels.linkField.isOpen = false
        state.todosApp.newTodoDialog.errorLabels.titleField.isOpen = false
      }


      const todoWithSameTitle = state.todosList.find((t) => t.title === state.todosApp.newTodoDialog.titleInput)

      if (todoWithSameTitle) {
        state.todosApp.newTodoDialog.errorLabels.titleField.isOpen = true
        state.todosApp.newTodoDialog.errorLabels.titleField.errorMessage = 'This title is already exist.'
      }

      else if (state.todosApp.newTodoDialog.linkInput) {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

        const match = state.todosApp.newTodoDialog.linkInput.match(regExp)

        if (!match) {
          state.todosApp.newTodoDialog.errorLabels.linkField.isOpen = true
          state.todosApp.newTodoDialog.errorLabels.linkField.errorMessage = 'Invalid youtube video link.'
        }

        else if (match) {
          saveNewTodo()
        }
      }

      else {
        saveNewTodo()
      }
    },


    // CHECK TODO
    checkTodo: (state, action: PayloadAction<CheckTodoAction>) => {
      const todo = state.todosList.find((t) => t.id === action.payload.id);

      if (todo) {
        todo.isCompleted = !todo.isCompleted;

        // STOR TODOS LIST
        localStorage.setItem("stored_todos", JSON.stringify(state.todosList));
      }
    },


    // DELETE TODO
    deleteTodo: (state) => {
      state.todosList = state.todosList.filter((t) => {
        return t.id !== state.todosApp.selectedTodoId
      })

      // STOR TODOS LIST
      localStorage.setItem("stored_todos", JSON.stringify(state.todosList));


      // HIDE DELETE TODO DIALOG
      state.todosApp.deleteTodoDialog.isOpen = false

    },


    // EDIT TODO
    editTodo: (state) => {

      // SAVE UPDATED TODO FUNCTION
      const saveUpdatedTodo = () => {
        const todo = state.todosList.find((t) => t.id === state.todosApp.selectedTodoId);
        if (todo) {
          todo.title = state.todosApp.editTodoDialog.updatedTitleInput;
          todo.description = state.todosApp.editTodoDialog.updatedDescriptionInput;
          todo.link = state.todosApp.editTodoDialog.updatedLinkInput;
        }
        
        // STOR TODOS LIST
        localStorage.setItem("stored_todos", JSON.stringify(state.todosList));
        
        // HIDE EDIT TODO DIALOG
        state.todosApp.editTodoDialog.isOpen = false

        // HIDE INVALID ERROR
        state.todosApp.editTodoDialog.errorLabels.linkField.isOpen = false
        state.todosApp.editTodoDialog.errorLabels.titleField.isOpen = false
      }

      const todoWithSameTitle = state.todosList.find((t) => 
        t.title === state.todosApp.editTodoDialog.updatedTitleInput && t.id !== state.todosApp.selectedTodoId
      )

      if (todoWithSameTitle) {
        state.todosApp.editTodoDialog.errorLabels.titleField.isOpen = true
        state.todosApp.editTodoDialog.errorLabels.titleField.errorMessage = 'This title is already exist.'
      }

      else if (state.todosApp.editTodoDialog.updatedLinkInput) {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

        const match = state.todosApp.editTodoDialog.updatedLinkInput.match(regExp)

        if (!match) {
          state.todosApp.editTodoDialog.errorLabels.linkField.isOpen = true
          state.todosApp.editTodoDialog.errorLabels.linkField.errorMessage = 'Invalid youtube video link.'
        }

        else if (match) {
          saveUpdatedTodo()
        }
      }

      else {
        saveUpdatedTodo()
      }

    },

  }
});


// EXPORT SLICE
export const todosSliceReducer = todosSlice.reducer
export const { dialogsControl, setSelectedTodoId, createNewTodo, handleInputsChange, emptyStatesControl, getStoredData, checkTodo, deleteTodo, editTodo, themeToggle, getVideoThumbnail, onThumbnailLoad } = todosSlice.actions

// EXPORT STATES
export const selectTheme = (state: RootState) => state.todos.todosApp.theme;
export const selectSelectedTodoId = (state: RootState) => state.todos.todosApp.selectedTodoId;
export const selectNewTodoDialog = (state: RootState) => state.todos.todosApp.newTodoDialog;
export const selectTodoCard = (state: RootState) => state.todos.todosApp.todoCard;
export const selectEditTodoDialog = (state: RootState) => state.todos.todosApp.editTodoDialog;
export const selectDeleteTodoDialog = (state: RootState) => state.todos.todosApp.deleteTodoDialog;
export const selectEmptyStates = (state: RootState) => state.todos.todosApp.emptyStates;
export const selectTodosList = (state: RootState) => state.todos.todosList;