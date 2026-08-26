import { configureStore } from '@reduxjs/toolkit';
import { todosSliceReducer } from '@/features/TodoSlice';

export const store = configureStore({
  reducer: {
    todos: todosSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
