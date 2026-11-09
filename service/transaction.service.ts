import { RTKApi } from "@/context/rtk-query";
import { IAddClient, IClient, ISelectClient } from "@/interface/transaction.interface";

export const clientApi = RTKApi.injectEndpoints({
    endpoints: build => ({
        addClient: build.mutation<IClient, IAddClient>({
            query: data => ({
                url: "v1/client",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Client"],
        }),

        updateClient: build.mutation<IClient, { id: string; data: Partial<IAddClient> }>({
            query: ({ id, data }) => ({
                url: `v1/client/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Client"],
        }),

        deleteClient: build.mutation<void, string>({
            query: id => ({
                url: `v1/client/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Client"],
        }),

        getClientById: build.query<IClient, string>({
            query: id => `v1/client/${id}`,
            providesTags: (_result, _error, id) => [{ type: "Client", id }],
        }),

        getAllClients: build.query<IClient[], void>({
            query: () => "v1/client",
            providesTags: ["Client"],
        }),

        selectClients: build.query<ISelectClient[], void>({
            query: () => "v1/client/select",
            providesTags: ["Client"],
        }),
    }),
});

export const {
    useAddClientMutation,
    useUpdateClientMutation,
    useDeleteClientMutation,
    useGetClientByIdQuery,
    useGetAllClientsQuery,
    useSelectClientsQuery
} = clientApi;