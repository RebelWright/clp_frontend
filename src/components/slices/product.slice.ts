import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../models/Product';

const BASE_URL = "http://localhost:5000";

interface ProductState {
  product: Product | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  status: 'idle',
  error: null,
};
export const fetchProductById = createAsyncThunk(
	"products/fetchProductById",
	async (productId: any) => {
		try {
			const response = await axios.get(`${BASE_URL}/products/${productId}`);
			return response.data;
		} catch (err: any) {
			return err.message;
		}
	}
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = 'idle';
        state.error = null;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong';
      });
  },
});

export const getProduct = (state: any) => {
	return state.product.product;
};

export default productSlice.reducer;