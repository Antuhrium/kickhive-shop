import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadState } from "../localStorage";

export interface CartItem {
    uid: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = loadState() || {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(
                (item) =>
                    item.uid === action.payload.uid &&
                    item.size === action.payload.size &&
                    item.color === action.payload.color
            );
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push(action.payload);
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            const existingItem = state.items.find(
                (item) => item.uid === action.payload
            );
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } else {
                state.items = state.items.filter(
                    (item) => item.uid !== action.payload
                );
            }
        },
        clearItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.uid !== action.payload
            );
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
