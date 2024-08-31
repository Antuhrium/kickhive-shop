import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import catalogReducer from "./slices/catalogSlice";
import { saveState } from "./localStorage";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        catalog: catalogReducer,
    },
});

store.subscribe(() => {
    saveState(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
