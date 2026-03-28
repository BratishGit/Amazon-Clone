import { createFileRoute, Link } from '@tanstack/react-router'
import { Navbar } from '@/components/Navbar'
import { XCircle } from 'lucide-react'

export const Route = createFileRoute('/checkout/cancel')({
  component: CheckoutCancel,
})

function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <Navbar />
      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="bg-white rounded p-8 text-center shadow-sm">
          <XCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Checkout Cancelled</h1>
          <p className="text-gray-600 mb-6">
            Your payment was cancelled. No charges were made.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/cart"
              className="px-6 py-2.5 bg-[#FF9900] hover:bg-[#FA8900] text-gray-900 font-medium rounded-full text-sm"
            >
              Return to Cart
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
