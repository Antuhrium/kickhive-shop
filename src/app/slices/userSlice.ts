import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    uid: string;
}

const initialState: UserState = {
    uid: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUID(state, action: PayloadAction<string>) {
            state.uid = action.payload;
        },
    },
});

export const { setUID } = userSlice.actions;
export default userSlice.reducer;
