import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:3000",
        credentials: 'include'}),
    tagTypes:['Product','Order','User'],
    endpoints:(builder)=>({})
})
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const apiSlice = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:3000",
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().auth.token; // Assuming you have a token in your auth state
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       headers.set('Content-Type', 'application/json');
//       headers.set('Accept', 'application/json');
//       headers.set('Access-Control-Allow-Credentials', 'true'); // Add this line
//       return headers;
//     },
//   }),
//   tagTypes: ['Product', 'Order', 'User'],
//   endpoints: (builder) => ({}),
// });
