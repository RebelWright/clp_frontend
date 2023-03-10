import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, getProducts } from "../slices/products.slice";
import { Link } from "react-router-dom";
import { Product } from "../models/Product";
import "./Products.css"

const Products = () => {
  const dispatch = useDispatch<any>();
  const products = useSelector(getProducts);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="product-list">
        {products.map((product:Product) => (
          <div className="product" key={product.productId}>
            <h2 className = "product-name">{product.productName}</h2>
            <Link to={`/products/${product.productId}`}>
              <img className="product-image" src={product.imageUrl} alt={product.productName} />
            </Link>
          </div>
        ))}
      </div>
  );
};

export default Products;
