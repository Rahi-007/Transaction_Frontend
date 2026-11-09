import { RTKApi } from "@/context/rtk-query";
import { IAddCategory, ICategory, ISelectCategory } from "@/interface/category.interface";

export const categoryApi = RTKApi.injectEndpoints({
    endpoints: build => ({
        addCategory: build.mutation<ICategory, IAddCategory>({
            query: data => ({
                url: "v1/category",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Category"],
        }),

        updateCategory: build.mutation<ICategory, { id: string; data: Partial<IAddCategory> }>({
            query: ({ id, data }) => ({
                url: `v1/category/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Category"],
        }),

        deleteCategory: build.mutation<void, string>({
            query: id => ({
                url: `v1/category/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),

        getCategoryById: build.query<ICategory, string>({
            query: id => `v1/category/${id}`,
            providesTags: (_result, _error, id) => [{ type: "Category", id }],
        }),

        getAllCategories: build.query<ICategory[], void>({
            query: () => "v1/category",
            providesTags: ["Category"],
        }),

        selectCategories: build.query<ISelectCategory[], void>({
            query: () => "v1/category/select",
            providesTags: ["Category"],
        }),
    }),
});

export const {
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoryByIdQuery,
    useGetAllCategoriesQuery,
    useSelectCategoriesQuery
} = categoryApi;