import { configureStore } from "@reduxjs/toolkit";
import enteredDataReducer from "./slice/enteredData";

import usersDataReducer from "./slice/userFormData"

const store = configureStore({
    reducer: {
        usersData: usersDataReducer,
        enteredData: enteredDataReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;