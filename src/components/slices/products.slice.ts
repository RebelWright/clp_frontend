import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

// define our initial state
const initialState = {
	products: [],
};


//create async thunks

export const fetchAllProducts = createAsyncThunk(
	"products/fetchAllProducts",
	async () => {
		try {
			const response = await axios.get(`${BASE_URL}/products`);
			return response.data;
		} catch (err: any) {
			return err.message;
		}
	}
);



//create the product slice
const productsSlice = createSlice({
	name: "products",
	initialState,
	//reducers allow us to modify state using functions
	//not a function to GET data, but rather MODIFY data
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchAllProducts.fulfilled, (state, action) => {
				state.products = action.payload;
			});
	},
});

// export functions you want to use in the app
export const getProducts = (state: any) => {
	return state.products.products;
};



// export actions
export const {} = productsSlice.actions; //eslint-disable-line

//export reducer
export default productsSlice.reducer;
