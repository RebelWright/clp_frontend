import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/routing/Layout";
import { getUser, setUser } from "./components/slices/users.slice";
import Product from "./components/product/Product";
import Products from "./components/products/Products";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

function App() {
	const dispatch = useDispatch<any>();
	const user = useSelector(getUser);

	useEffect(() => {
		dispatch(setUser());
	}, []); // eslint-disable-line


	return (
		<Routes>
			<Route path="" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="products">
					<Route index element={<Products />} />
					<Route path=":productId" element={<Product />} />
				</Route>*
				<Route path="*" element={<Navigate to="" />} />
			</Route>
		</Routes>
	);
}

export default App;
