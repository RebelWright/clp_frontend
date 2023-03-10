import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

// define our initial state
const initialState = {
	user: {},
	status: "idle",
};

// create async thunks
export const register = createAsyncThunk(
	"auth/register",
	async (body: any) => {
		try {
			const response = await axios.post(`${BASE_URL}/auth/register`, body);
			return response.data;
		} catch (err: any) {
			return err.message;
		}
	}
);
export const login = createAsyncThunk("auth/login", async (body: any) => {
	try {
		const response = await axios.post(`${BASE_URL}/auth/login`, body);
		return response.data;
	} catch (err: any) {
		throw new Error(err.message);
	}
});



// create the user slice
const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setUser(state) {
			state.user = JSON.parse(localStorage.getItem("user") || "");
		},
		logout(state) {
			localStorage.setItem("user", JSON.stringify({}));
			state.user = JSON.parse(localStorage.getItem("user") || "");
		},
		setStatus(state, action) {
			state.status = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.status = "success";
				localStorage.setItem("user", JSON.stringify(action.payload));
			})
			.addCase(login.rejected, (state, action) => {
				state.status = "rejected";
			});
	},
});

// export functions you want to use in the app
export const getUser = (state: any) => state.users.user;
export const getStatus = (state: any) => state.users.status;

// export actions
export const { setUser, logout, setStatus } = usersSlice.actions; // eslint-disable-line

// export reducer
export default usersSlice.reducer;
