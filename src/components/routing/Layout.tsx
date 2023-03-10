import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Toasts from "../toasts/Toasts";
import { addToast } from "../slices/toasts.slice";
import { getUser, logout } from "../slices/users.slice";
import "./Layout.css";

/*
This is the layout for every single page
*/
const Layout: React.FC<any> = () => {
	const dispatch = useDispatch();
	const user = useSelector(getUser);

	const handleLogout = () => {
		dispatch(logout());
		dispatch(
			addToast({
				status: "success",
				message: "You have been logged out.",
			})
		);
	};

	useEffect(() => {}, [user]);

	return (
		<>
			<header className="mainHeader">
				<h1>Revature Books</h1>
				<nav className = "products-link"><Link to="Products">Products</Link></nav>
				<nav>
					{user?.flagURL && (
					<img style={{ color: "white" }} src={user.flagURL} alt="Flag Goes Here" />
					)}
					{user?.userId >= 0 ? (
						<Link to="/" onClick={handleLogout}>
							Logout
						</Link>
					) : (
						<>
							<Link to="login">Login</Link>
							<Link to="register">Register</Link>
						</>
					)}
				</nav>
			</header>
			<div className="container">
				{/* This links to the appropriate page component  */}
				<Outlet />
			</div>
			<Toasts />
		</>
	);
};

export default Layout;
