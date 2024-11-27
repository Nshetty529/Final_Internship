import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://final-internship.onrender.com/api/orders?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("API Response:", response.data); // Debugging: Log the API response
      setOrders(response.data.orders || []); // Use an empty array as fallback
      setTotalPages(response.data.totalPages || 1); // Use 1 as fallback
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err.message);
      setError("Failed to load orders. Please try again later.");
      setLoading(false);
    }
  };
  

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: response.data.status } : order
        )
      );
      alert("Order status updated successfully!");
    } catch (err) {
      console.error("Error updating order status:", err.message);
      alert("Failed to update order status. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-orders">
      <h2>Manage Orders</h2>
      {orders && orders.length > 0 ? (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.name || "N/A"}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>
                  <button
                    onClick={() => handleUpdateStatus(order._id, "Shipped")}
                    className="update-button"
                  >
                    Mark as Shipped
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(order._id, "Delivered")}
                    className="update-button"
                  >
                    Mark as Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}

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

export default AdminOrders;
