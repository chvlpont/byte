import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    selectedProduct: null,
  },
  reducers: {
    // Add to cart
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
      } else {
        state.cart.push({ ...newItem, quantity: 1 });
      }
    },

    // Remove from cart
    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload.id;
      const existingItem = state.cart.find(
        (item) => item.id === itemIdToRemove
      );

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) - 1;

        if (existingItem.quantity <= 0) {
          const indexToRemove = state.cart.findIndex(
            (item) => item.id === itemIdToRemove
          );

          if (indexToRemove !== -1) {
            state.cart.splice(indexToRemove, 1);
          }
        }
      }
    },
    // Clear the entire cart
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
