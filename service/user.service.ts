import { RTKApi } from "@/context/rtk-query";
import { IAddTransition, ITransition } from "@/interface/transaction.interface";

export const transitionApi = RTKApi.injectEndpoints({
  endpoints: build => ({
    addTransition: build.mutation<ITransition, IAddTransition>({
      query: data => ({
        url: "v1/transition",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transition"],
    }),

    updateTransition: build.mutation<ITransition, { id: string; data: Partial<IAddTransition> }>({
      query: ({ id, data }) => ({
        url: `v1/transition/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Transition"],
    }),

    deleteTransition: build.mutation<void, string>({
      query: id => ({
        url: `v1/transition/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transition"],
    }),

    getTransitionById: build.query<ITransition, string>({
      query: id => `v1/transition/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Transition", id }],
    }),

    getAllTransitions: build.query<ITransition[], void>({
      query: () => "v1/transition",
      providesTags: ["Transition"],
    }),
  }),
});

export const {
  useAddTransitionMutation,
  useUpdateTransitionMutation,
  useDeleteTransitionMutation,
  useGetTransitionByIdQuery,
  useGetAllTransitionsQuery
} = transitionApi;