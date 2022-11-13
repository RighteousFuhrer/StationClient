import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery : fetchBaseQuery({baseUrl : "http://localhost:3500"}),
    endpoints : (builder) => ({
        getGameProps : builder.query<any, any>({
            query : ()=> "/models",
        })
    })
})

export const {
    useGetGamePropsQuery
} = apiSlice