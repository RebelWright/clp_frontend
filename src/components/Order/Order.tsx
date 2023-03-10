export {}; /*import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewOrder, addProductToOrder, removeProductFromOrder, placeOrder, getOrderById } from "../slices/orders.slice";
import { RootState } from '../store/store';
const Order = ({ userId }: { userId: number }) => {
  const dispatch = useDispatch();
  const order = useSelector(state => state.orders.order);

  useEffect(() => {
    dispatch(createNewOrder(userId));
  }, [dispatch, userId]);

  const handleAddProductToOrder = (orderId: number, product: any) => {
    dispatch(addProductToOrder({ orderId, product }));
  };

  const handleRemoveProductFromOrder = (orderId: number, product: any) => {
    dispatch(removeProductFromOrder({ orderId, product }));
  };

  const handlePlaceOrder = (orderId: number) => {
    dispatch(placeOrder(orderId)).then(() => {
      dispatch(getOrder());
    });
  };

  return (
    <div>
      <h1>Order Component</h1>
      {order && (
        <div>
          <h2>Order ID: {order.id}</h2>
          <ul>
            {order.products.map((product: any) => (
              <li key={product.id}>
                {product.name} - {product.price}
                <Button onClick={() => handleRemoveProductFromOrder(order.id, product)}>
                  Remove
                </button>
                <Button onClick={() => handleAddProductToOrder(order.id, product)}>
                  Add Product
                </button>
              </li>
            ))}
          </ul>
          <Button onClick={() => handlePlaceOrder(order.id)}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default Order;
*/
