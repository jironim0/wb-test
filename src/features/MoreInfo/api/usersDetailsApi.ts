import { baseApi } from "@/app/model/baseApi";
import type { User } from "@/app/ui/MainPage/api/userApi.type";


export const usersDetailsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchUserById: build.query<User, string>({
            query: (id) => `users/${id}`
        })
    })
})

export const {
    useFetchUserByIdQuery
} = usersDetailsApi