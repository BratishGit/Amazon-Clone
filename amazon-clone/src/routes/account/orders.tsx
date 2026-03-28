import { createFileRoute, Link } from '@tanstack/react-router'
import { Navbar } from '@/components/Navbar'
import { useOrders } from '@/context/OrderContext'
import { Package, ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/account/orders')({
  component: OrdersPage,
})

function OrdersPage() {
  const { orders } = useOrders()

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <Navbar />
      <div className="max-w-screen-lg mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded p-12 text-center">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-600 mb-2">No orders yet</p>
            <p className="text-gray-500 mb-6">When you place an order, it will appear here</p>
            <Link
              to="/"
              className="inline-block px-8 py-2 bg-[#FF9900] hover:bg-[#FA8900] rounded-full font-medium text-gray-900"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded border border-gray-200">
                {/* Order header */}
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex flex-wrap gap-4 items-center">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium">Order Placed</p>
                    <p className="text-sm">{new Date(order.placedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium">Total</p>
                    <p className="text-sm font-bold">${order.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium">Ship To</p>
                    <p className="text-sm">{order.shippingAddress.fullName}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-4">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Order #</p>
                      <p className="text-xs font-mono text-[#007185]">{order.id}</p>
                    </div>
                  </div>
                </div>

                {/* Order items */}
                <div className="p-4">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex gap-4 py-3 border-b last:border-0">
                      <Link to="/products/$productId" params={{ productId: String(item.productId) }}>
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-20 h-20 object-cover rounded border border-gray-200"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          to="/products/$productId"
                          params={{ productId: String(item.productId) }}
                          className="font-medium text-gray-900 hover:text-[#C7511F] line-clamp-2"
                        >
                          {item.productName}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">
                          Qty: {item.quantity} · ${item.price.toFixed(2)} each
                        </p>
                        <div className="flex gap-3 mt-2">
                          <Link
                            to="/products/$productId"
                            params={{ productId: String(item.productId) }}
                            className="text-sm text-[#007185] hover:text-[#C7511F] flex items-center gap-1"
                          >
                            Buy again <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping address */}
                <div className="px-4 py-3 bg-gray-50 border-t text-xs text-gray-600 rounded-b">
                  <strong>Shipped to:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}, {order.shippingAddress.country}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
