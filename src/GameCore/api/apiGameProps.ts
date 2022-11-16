import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/stationmanager",
  }),
  tagTypes: [""],
  endpoints: (builder) => ({
    getGameProps: builder.query<any, any>({
      query: () => {
        return {
          url: "",
          headers : {}
        };
      },
    }),
  }),
});

export const { useGetGamePropsQuery } = apiSlice;
