import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_FIREBASE } from "../firebase/database";

//Aquí hago las peticiones CRUD con Redux para traer de la DB de Firebase

export const shopApi = createApi({
  reducerPath: "shopApi", //nombre
  baseQuery: fetchBaseQuery({ baseUrl: URL_FIREBASE }), //URL base
  tagTypes: ['userImage', 'order', ], //para que los actualice cuando hago un cambio
  endpoints: (builder) => ({ // una funcion que retorna un objeto
    getCategories: builder.query({
      query: () => "categories.json", //la query es una funcion que retorna la URL que yo quiero.
    }),
    getProducts:builder.query({
      query: (category) => 
      `products.json?orderBy="category"&equalTo="${category}"`,
       transformResponse:(response) => { // esto es una funcion que recibe la respuesta y la transforma en un array (yo necesito pasarle un array a la Flatlilst para que lo pueda reconocer)
        const data = Object.values(response);
        console.log(data)
        return data
      }
    }),
    getProduct: builder.query({
      query:(id) =>`products/${id}.json` //me comunico con la DB solo con  el id del producto
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
    

    getUser: builder.query({
      query:({localId}) => `users/${localId}.json`,
      transformResponse:(response) => {

        if(!response) return {image:''}

        if (!response.image) response.image = ''

        const data= Object.entries(response).map(item => ({id:item[0], ...item [1]}))
        return{
          ...response,
          
        }
      },
      providesTags: ['userImage']
    })
  }),
});

export const { useGetCategoriesQuery, 
  useGetProductsQuery,
  useGetProductQuery,
  usePostOrderMutation, 
  useGetOrdersByUserQuery, 
  usePatchImageProfileMutation,
  useGetUserQuery,
  useGetOrderByUserQuery
} = shopApi;
