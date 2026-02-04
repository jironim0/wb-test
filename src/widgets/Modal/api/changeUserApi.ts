import { baseApi } from "@/app/model/baseApi";
import { userApi } from "@/app/ui/MainPage/api/userApi";
import type { User } from "@/app/ui/MainPage/api/userApi.type";
import type { AddUserResponse, UserUpload } from "./changeUserApi.type";

export const changeUser = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation<AddUserResponse, UserUpload>({
      query: (newUser) => ({
        url: "users/add",
        method: "POST",
        body: newUser
      }),
    }),
    updateUser: build.mutation<User, Partial<User> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: patch,
      }),
      // В общем тут я залез в КЭШ и на 1-ой странице редактирование работает, т.е User увидет результат. Api не дает менять значения в БД. Возвращает 200-ые Статусы типо все ок, но это тупо имитация
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData(
            "fecthUsers",
            { limit: 10, skip: 0 },
            (draft) => {
              const userIndex = draft.users.findIndex((user) => user.id === id);
              if (userIndex !== -1) {
                Object.assign(draft.users[userIndex], patch);
              }
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useCreateUserMutation, useUpdateUserMutation } = changeUser;
