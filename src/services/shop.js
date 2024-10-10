import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_FIREBASE } from "../firebase/database";

export const shopApi = createApi({
  reducerPath: "shopApi", //nombre
  baseQuery: fetchBaseQuery({ baseUrl: URL_FIREBASE }), //URL base
  endpoints: (builder) => ({ // una funcion que retorna un objeto
    getCategories: builder.query({
      query: () => "/categories.json", //la query es una funcion que retorna la URL que yo quiero.
    }),
    getProducts: builder.query({
      query: (category) => //le agrego la query para que filtre por categoria 
        `"/products.json?orderBy="category"&equalTo="${category}"`, //query que ordena los productos por categoria y filtra por la categoria - viene de firebase
      transformResponse: (response) => { // esto es una funcion que recibe la respuesta y la transforma en un array (yo necesito pasarle un array a la Flatlilst para que lo pueda reconocer)
        const data = Object.values(response);
        return data;
      },
    }),
    getProduct: builder.query({
      query:(id) =>`/products/${id}.json` //me comunico con la DB solo con  el id del producto
    }),
    getOrdersByUser: builder.query({
      query:(localId) => `/orders/${localId}.json`,
      transformResponse:(response)=>{
        if(!response)return []
        const data = Object.entries(response).map(item=> ({id:item[0], ...item[1]}))
        return data
      },
      providesTags:['order']
    }),
    getOrderByUser: builder.query({
      query:({localId, orderId}) => `/orders/${localId} /${orderId}.json`
    }),
    postOrder:builder.mutation({
      query:({localId, order}) => ({
        url:`/orders/${localId}.json`,
        method: 'POST',
        body:order
      }),
      invalidatesTags:["order"]
    }),

    patchImageProfile: builder.mutation({
      query:({image, localId}) => ({
        url:`users/${localId}.json`,
        method: 'PATCH',
        body:{image}
      }),
      invalidatesTags:['userImage']
    }),
    postUserLocation:builder.mutation({
      query:({localId, userLocation}) => ({
        url:`/users/${localId}/locations.json`,
        method: 'POST',
        body:userLocation
      }),
      invalidatesTags:["userLocation"]
    }),

    getUser: builder.query({
      query:({localId}) => `users/${localId}.json`,
      transformResponse:(response) => {

        if(!response) return {image:'',locations:[]}
        if(!response.locations) response.locations = []
        if (!response.image) response.image = ''

        const data= Object.entries(response.locations).map(item => ({id:item[0], ...item [1]}))
        return{
          ...response,
          locations:data
        }
      },
      providesTags: ['userImage','userLocation']
    })
  }),
});

export const { useGetCategoriesQuery, 
  useGetProductsQuery,
  useGetProductQuery,
  usePostOrderMutation, 
  useGetOrdersByUserQuery, 
  usePatchImageProfileMutation,
  usePostUserLocationMutation,
  useGetUserQuery,
  useGetOrderByUserQuery
} = shopApi;
