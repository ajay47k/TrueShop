import {apiSlice} from './apiSlice'

// import {}

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        // createOrder:builder.mutation({
        //       query: (order)=>({
        //         url:'api/orders',
        //         method:'POST',
        //         body:{...order}
        //     })
        // }),
        createOrder: builder.mutation({
            query: (order) => {
                // console.log(order); // Yahan console.log() ka istemal karen
                return {
                    url: 'api/orders',
                    method: 'POST',
                    body: { ...order }
                };
            }
        }),
        getOrderDetails:builder.query({
            query: (orderId)=>({
                url:`api/orders/${orderId}`,
                method:'GET',// get by default
                // body:{...order}
            }),
            keepUnusedDataFor:5
        }),
        payOrder:builder.mutation({
            query:({orderId,details})=>({
                url :`/api/orders/${orderId}/pay`,
                method:'PUT',
                body:{...details},
            })
        }),
        getPayPalClientId: builder.query({
            query:()=>({
                url:'/api/config/paypal'
            }),
            keepUnusedDataFor:5,
        }),
        getMyOrders:builder.query({
            query:()=>({
                    url:'/api/orders/mine',
                    method:'GET'
            })
        }),
        getOrders:builder.query({
            query:()=>({
                url:'api/orders',
                method:'GET'
            }),
            keepUnusedDataFor:5,
        }),
        deliverOrder:builder.mutation({
            query:(orderId)=>({
                    url:`/api/orders/${orderId}/deliver`,
                    method:"PUT"
            })
        })
    })
})

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    useGetPayPalClientIdQuery,
    usePayOrderMutation,
    useGetMyOrdersQuery,
    useGetOrdersQuery,
    useDeliverOrderMutation} = orderApiSlice
