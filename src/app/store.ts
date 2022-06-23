import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import studentSearchReducer from '../features/student_search/studentSearchSlice';

export const store = configureStore({
  reducer: {
    studentSearch: studentSearchReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
