import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
    brand: string;
    name: string;
    photos: number;
    preview: string;
    price: number;
    season: string;
    style: string;
    type_: string;
    uid: string;
    web_data: {
        description: string;
        season: string;
        type_: string;
    };
}

interface CatalogState {
    products: Product[];
}

const initialState: CatalogState = {
    products: [],
};

const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        },
    },
});

export const { setProducts } = catalogSlice.actions;

export default catalogSlice.reducer;
