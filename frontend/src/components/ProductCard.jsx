import React, { useContext } from "react";
import "../assets/styles/product_card.css";
import { useDispatch } from 'react-redux'
import { addItem } from "../redux/slice/cartSlice";
import AuthContext from "./AuthContext";


const ProductCard = (props) => {
  console.log(props, "in product card");
  const { product } = props;

  const dispatch = useDispatch()

  const handleAddToCart = (item) => {
    dispatch(addItem(item))
  }

  const { loggedIn } =
  useContext(AuthContext);

  return (
    <div className="card product-card">
      <img src={product.Img} alt="" />
      <div className="mt-2">
        <div>
          <h6>{product.Product_Name}</h6>
          <span className="text-muted">IDR {product.Price}</span>
        </div>
        <div className="d-flex flex-row justify-content-end">
          {loggedIn ? (
            <button className="btn btn-primary mt-2" onClick={() => handleAddToCart(product)}>Add to Cart</button>
          ) : (
            <button className="btn btn-primary mt-2" disabled>Add to Cart</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
