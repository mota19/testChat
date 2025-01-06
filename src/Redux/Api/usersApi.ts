import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Conversation, User, Message } from "../../types/types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<Conversation[], void>({
      query: () => `users`,
    }),
    getUser: builder.query<Conversation, { id: string }>({
      query: ({ id }) => `users/${id}`,
    }),
    getChat: builder.query<User, { id: string; chatId: string }>({
      query: ({ id, chatId }) => `users/${id}/${chatId}`,
    }),
    patchname: builder.mutation<
      User,
      { id: string; chatId: string; first_name: string; last_name: string }
    >({
      query: ({ id, chatId, first_name, last_name }) => ({
        url: `updateName/${id}/${chatId}`,
        method: "PATCH",
        body: { first_name, last_name },
      }),
    }),
    patchMessage: builder.mutation<
      User,
      { id: string; chatId: string; updatedData: Message }
    >({
      query: ({ id, chatId, updatedData }) => ({
        url: `updateMSG/${id}/${chatId}`,
        method: "PATCH",
        body: updatedData,
      }),
    }),
    deleteChat: builder.mutation<void, { id: string; chatId: string }>({
      query: ({ id, chatId }) => ({
        url: `deleteChat/${id}/${chatId}`,
        method: "DELETE",
      }),
    }),
    addChat: builder.mutation({
      query: ({ id, chatId, first_name, last_name, avatar }) => ({
        url: `/addChat/${id}`,
        method: "POST",
        body: { chatId, first_name, last_name, avatar },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetChatQuery,
  usePatchMessageMutation,
  usePatchnameMutation,
  useDeleteChatMutation,
  useAddChatMutation,
} = usersApi;
