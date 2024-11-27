import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  // // const [newProduct, setNewProduct] = useState({
  //   name: "",
  //   salePrice: "",
  //   categories: "",
  // });

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/products?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data.data);
      setProducts(response.data.data.products);
      setTotalPages(response.data.data.totalPages || 1);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err.message);
      setError("Failed to load products. Please try again later.");
      setLoading(false);
    }
  };

  
  

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/products/${editProduct._id}`,
        {
          name: editProduct.name,
          salePrice: parseFloat(editProduct.salePrice),
          categories: editProduct.categories.split(",").map((cat) => cat.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(
        products.map((product) =>
          product._id === editProduct._id ? response.data : product
        )
      );
      alert("Product updated successfully!");
      setShowEditForm(false);
      setEditProduct(null);
    } catch (err) {
      console.error("Error updating product:", err.message);
      alert("Failed to update product. Please try again.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(products.filter((product) => product._id !== productId));
        alert("Product deleted successfully!");
      } catch (err) {
        console.error("Error deleting product:", err.message);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  const openEditForm = (product) => {
    setEditProduct({
      ...product,
      categories: Array.isArray(product.categories)
        ? product.categories.join(", ")
        : product.categories,
    });
    setShowEditForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-products">
      <h2>Manage Products</h2>

      {/* <button className="add-product-button" onClick={() => setShowAddForm(true)}>
        Add Product
      </button> */}

      

      {/* Edit Product Form */}
      {showEditForm && (
        <div className="edit-product-form">
          <h3>Edit Product</h3>
          <form onSubmit={handleEditProduct}>
            <label>
              Name:
              <input
                type="text"
                value={editProduct.name}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
                required
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                step="0.01"
                value={editProduct.salePrice}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, salePrice: e.target.value })
                }
                required
              />
            </label>
            <label>
              Categories (comma-separated):
              <input
                type="text"
                value={editProduct.categories}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, categories: e.target.value })
                }
                required
              />
            </label>
            <div className="form-buttons">
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setShowEditForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.salePrice}</td>
              <td>{product.categories.join(", ")}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => openEditForm(product)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminProducts;
