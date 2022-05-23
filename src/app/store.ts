import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { api as topicAPI } from '../features/topic/topicAPI';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [topicAPI.reducerPath]: topicAPI.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(topicAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
