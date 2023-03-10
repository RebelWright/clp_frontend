import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const initialState = {
	order: [],
};

export const createNewOrder = createAsyncThunk(
	"orders/createNewOrder",
	async (userId: any) => {
		try {
			const response = await axios.post(
				`${BASE_URL}/orders/${userId}/createOrder`);
			return response.data;
		} catch (err: any) {
			return err.message;
		}
	}
);

export const addProductToOrder = createAsyncThunk(
  "orders/addProductToOrder",
  async ({ orderId, product }: { orderId: number, product: any }) => {
    try {
      const response = await axios.post(`${BASE_URL}/orders/${orderId}/addProduct`, product);
      return response.data;
    } catch (err: any) {
      return err.message;
    }
  }
);

export const removeProductFromOrder = createAsyncThunk(
  "orders/removeProductFromOrder",
  async ({ orderId, product }: { orderId: number, product: any }) => {
    try {
      const response = await axios.post(`${BASE_URL}/orders/${orderId}/removeProduct`, product);
      return response.data;
    } catch (err: any) {
      return err.message;
    }
  }
);

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderId: number) => {
    try {
      const response = await axios.put(`${BASE_URL}/orders/placeOrder/${orderId}`);
      return response.data;
    } catch (err: any) {
      return err.message;
    }
  }
);
export const getOrderById = async (userId: number, orderId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}/${orderId}`);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
};
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers(builder) {
  builder
    .addCase(createNewOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    })
    .addCase(placeOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    })
    .addCase(addProductToOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    })
    .addCase(removeProductFromOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    });
},
});

// Export functions you want to use in the app
export const getOrder = (state: any) => state.order;

// Export actions
export const {} = orderSlice.actions;

// Export reducer
export default orderSlice.reducer;
