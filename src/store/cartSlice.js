import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // { _id, name, price, quantity, image }
  total: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    addItem(state, action) {
      const incoming = action.payload;
      const exist = state.items.find((i) => i._id === incoming._id);
      if (exist) {
        exist.quantity += incoming.quantity || 1;
      } else {
        state.items.push({ ...incoming, quantity: incoming.quantity || 1 });
      }
      state.total = state.items.reduce((s, it) => s + it.price * it.quantity, 0);
    },
    updateQty(state, action) {
      const { _id, quantity } = action.payload;
      const item = state.items.find((i) => i._id === _id);
      if (item) item.quantity = quantity;
      state.total = state.items.reduce((s, it) => s + it.price * it.quantity, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((i) => i._id !== action.payload);
      state.total = state.items.reduce((s, it) => s + it.price * it.quantity, 0);
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    }
  }
});

export const { setCart, addItem, updateQty, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
