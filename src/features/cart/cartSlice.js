import {createSlice} from '@reduxjs/toolkit'

// inicializo una variable con lo que quiero que empiece mi carrito

const initialState = {
    items : [],
    total: 0
}
// creo una constante y ejecuto la función con un objeto de configuración

export const cartSlice = createSlice ({
  name: "cart",
  initialState, // estado inicial que configuré arriba 
  // reducers son un objeto con todos los métodos que van a modificar al carrito
  reducers: {
    addItemCart: (state, action) => {// state es el estado inicial
  const {id, price, quantity} = action.payload //lo que recibe cuando ejecuto alguna función 
  const itemFound = state.items.find(item => item.id === id)
  itemFound ? itemFound.quantity + quantity : state.items.push(action.payload) // si lo encontro, sumale 1 y sino agregalo
  state.total+= price * quantity
    },
    clearCart: (state) => {
        state.items = [],
        state.total = 0
    } 
}
})
export const  {addItemCart, clearCart} = cartSlice.actions
export default cartSlice.reducer