import { configureStore } from "@reduxjs/toolkit";
import reducer from "./classSlice"

export default configureStore({
    reducer: reducer,
})