import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "../slices/products.slice";
import usersReducer from "../slices/users.slice";
import toastsReducer from "../slices/toasts.slice";
import ordersReducer from "../slices/orders.slice";
import productReducer from "../slices/product.slice";

export const rootReducer = combineReducers({
  products: productsReducer,
  users: usersReducer,
  toasts: toastsReducer,
  orders: ordersReducer,
  product: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
