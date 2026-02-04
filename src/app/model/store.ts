import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";


export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaltMiddleware) => getDefaltMiddleware().concat(baseApi.middleware)
})