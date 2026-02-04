import { baseApi } from "@/app/model/baseApi";
import type { UsersResponse } from "./userApi.type";


export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fecthUsers: build.query<UsersResponse, { limit: number, skip: number }>({
            query: ({ limit, skip }) => ({
                url: 'users',
                params: { limit: limit, skip: skip }
            }),
            keepUnusedDataFor: 120
        })
    })
});


export const {
    useFecthUsersQuery
} = userApi