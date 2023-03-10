import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, getProduct } from '../slices/product.slice';
import { addToast } from '../slices/toasts.slice';
import { useParams } from 'react-router-dom';
import "./Product.css";



const Product: React.FC<any> = () => {
  const dispatch = useDispatch<any>();
  const { productId } = useParams();
  const product = useSelector(getProduct);

  const handleOrderClick = (productName: any) => {
  dispatch(addToast({ message: `${productName} has been ordered`, status: "success" }));
};

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-container">
      <h1 className="product-name">{product.productName}</h1>
      <div className="product-info">
        <img src={product.imageUrl} alt={product.productName} />
        <div className="description-price">
          <p>Description: {product.productDescription}</p>
          <p>Price: {product.price}</p>
        </div>
      </div>
      <button onClick={() => handleOrderClick(product.productName)}>Order</button>
    </div>

  );
};

export default Product;
