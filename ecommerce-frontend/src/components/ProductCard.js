import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css"; // Add this to import the custom styles

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">Price: ${product.salePrice.toFixed(2)}</p>
        <Link to={`/product/${product._id}`} className="view-details">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
