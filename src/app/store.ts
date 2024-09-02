import { configureStore } from "@reduxjs/toolkit";
import catalogReducer from "./slices/catalogSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
    reducer: {
        catalog: catalogReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
