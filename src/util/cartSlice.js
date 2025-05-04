/*import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.card.info.id !== action.payload.card.info.id
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;*/

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Each item will include quantity
  },
  reducers: {
    addItem: (state, action) => {
      const incoming = action.payload.card.info;
      const existingItem = state.items.find(item => item.id === incoming.id);
    
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: incoming.id,
          name: incoming.name,
          price: incoming.price,
          defaultPrice: incoming.defaultPrice,
          description: incoming.description,
          imageId: incoming.imageId,
          ratings: incoming.ratings,
          quantity: 1,
        });
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload.card.info.id;
      const existingItem = state.items.find(item => item.id === itemId);
    
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== itemId);
        }
      }
    },
    
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;




