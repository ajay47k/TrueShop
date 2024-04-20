import { method } from "lodash"
import { apiSlice } from "./apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login:builder.mutation({  // not really a querry but a builder mutation
            withCredentials: true,
            query:(data)=>({ // this will sill remain querry though
                url:'api/users/login',
                method:'POST',
                body:data,
                // withCredentials:true
            }),
            // keepUnusedDataFor:5
        }),
        logout:builder.mutation({

            query:(data)=>({ // this will sill remain querry though
                url:'api/users/logout',
                method:'POST',
                body:data,
        })
    }),
    profile:builder.mutation({
        query:(data)=>({
            url:'api/users/profile',
            method:'PUT',
            body:data,
        })
    })
    ,
    register:builder.mutation({
        query:(data)=>({ // this will sill remain querry though
            url:'api/users/register',
            method:'POST',
            body:data,
    })
}),
    getUsers:builder.query({
        query:()=>{
            console.log("Here we load users")
            return{
                url:'api/users',
                method:'GET',
            }

        }
    }),
    deleteUser:builder.mutation({
        query:(userId)=>{
            // console.log("Here we Delete users")
            return{
                url:`api/users/${userId}`,
                method:'DELETE'
            }
        }
    }),
    getUserDetails: builder.query({
        query:(userId)=>{
            return{
                url:`api/users/${userId}`,
                method:'GET'
            }
        },
        keepUnusedDataFor:5,
    })
    ,
    updateUser:builder.mutation({
        query:(data)=>{
            return{
                url:`api/users/${data.userId}`,
                method:'PUT',
                body:data,
            }
        },
        invalidatesTags:['User']
    })
})
})
export const {
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useGetUserDetailsQuery
} = usersApiSlice
// THis is not imported to the store because it is a child of the apiSlice and is already being used in the store