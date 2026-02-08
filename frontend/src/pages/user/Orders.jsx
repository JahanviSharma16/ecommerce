import { useEffect, useState } from "react";
import { getMyOrders } from "../../api/orderApi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center mt-10">No orders found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.map(order => (
        <div
          key={order._id}
          className="border rounded-lg p-4 mb-4 shadow-sm"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="font-medium text-lg">
                Order ID: {order._id.slice(-8)}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === 'PAID' 
                ? 'bg-green-100 text-green-800' 
                : order.status === 'FAILED'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {order.status}
            </span>
          </div>

          <div className="space-y-2 mb-3">
            {order.items?.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.product?.name || 'Product'}</span>
                <span>Qty: {item.quantity} × ₹{item.price}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-3">
            <p className="font-semibold text-lg">
              Total: ₹ {order.totalAmount}
            </p>
            {order.paymentId && (
              <p className="text-sm text-gray-500">
                Payment ID: {order.paymentId}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
