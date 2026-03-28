import { createFileRoute, Link } from '@tanstack/react-router'
import { Navbar } from '@/components/Navbar'
import { CheckCircle } from 'lucide-react'
import { z } from 'zod'
import { useOrders } from '@/context/OrderContext'

const searchSchema = z.object({
  orderId: z.string().optional(),
})

export const Route = createFileRoute('/checkout/success')({
  validateSearch: searchSchema,
  component: CheckoutSuccess,
})

function CheckoutSuccess() {
  const { orderId } = Route.useSearch()
  const { orders } = useOrders()
  const order = orderId ? orders.find((o) => o.id === orderId) : orders[0]

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded p-8 text-center shadow-sm">
          <CheckCircle size={64} className="text-[#007600] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. We'll send a confirmation email shortly.
          </p>

          {order && (
            <>
              <div className="bg-gray-50 rounded p-4 mb-6 text-left">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Order #</p>
                    <p className="font-mono font-bold text-sm">{order.id}</p>
                  </div>
                  <span className="bg-[#007600] text-white text-xs px-3 py-1 rounded-full">
                    {order.status}
                  </span>
                </div>

                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex gap-3 items-center">
                      <img src={item.productImage} alt={item.productName} className="w-10 h-10 object-cover rounded border" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{item.productName}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-3 pt-3 text-sm">
                  <div className="flex justify-between font-bold">
                    <span>Total</span><span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-600">
                    <p className="font-medium">Shipping to:</p>
                    <p>{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/account/orders"
              className="px-6 py-2.5 bg-[#FF9900] hover:bg-[#FA8900] text-gray-900 font-medium rounded-full text-sm"
            >
              View Your Orders
            </Link>
            <Link
              to="/"
              className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
