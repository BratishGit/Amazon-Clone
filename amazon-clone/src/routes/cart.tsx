import { createFileRoute, Link } from '@tanstack/react-router'
import { Navbar } from '@/components/Navbar'
import { CartItem } from '@/components/CartItem'
import { useCart } from '@/context/CartContext'
import { ShoppingCart, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/cart')({
  component: CartPage,
})

function CartPage() {
  const { items, subtotal, totalItems } = useCart()

  const shipping = subtotal >= 25 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Cart items */}
          <div className="flex-1 bg-white rounded p-6">
            <h1 className="text-3xl font-medium border-b border-gray-200 pb-4 mb-2">Shopping Cart</h1>
            {items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-600 mb-2">Your cart is empty</p>
                <p className="text-gray-500 mb-6">Add items to your cart to checkout</p>
                <Link
                  to="/"
                  className="inline-block px-8 py-2 bg-[#FF9900] hover:bg-[#FA8900] rounded-full font-medium text-gray-900"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="text-right text-sm text-gray-600 mb-2">Price</div>
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
                <div className="text-right mt-4 text-lg">
                  Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''}):
                  {' '}<strong>${subtotal.toFixed(2)}</strong>
                </div>
              </>
            )}
          </div>

          {/* Order summary */}
          {items.length > 0 && (
            <div className="lg:w-80 bg-white rounded p-6 sticky top-20">
              <div className="mb-4">
                {subtotal >= 25 ? (
                  <p className="text-sm text-[#007600]">
                    ✓ Your order qualifies for FREE delivery.
                  </p>
                ) : (
                  <p className="text-sm text-gray-700">
                    Add <strong>${(25 - subtotal).toFixed(2)}</strong> more for FREE delivery.
                  </p>
                )}
              </div>

              <div className="text-lg mb-4">
                Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''}):
                {' '}<strong>${subtotal.toFixed(2)}</strong>
              </div>

              <div className="space-y-1 text-sm text-gray-600 border-t pt-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-[#007600]">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span><span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
                  <span>Order Total</span><span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full block text-center bg-[#FF9900] hover:bg-[#FA8900] text-gray-900 font-medium py-2.5 rounded-full transition-colors"
              >
                Proceed to Checkout
                <ArrowRight size={16} className="inline ml-2" />
              </Link>

              <Link to="/" className="block text-center mt-3 text-sm text-[#007185] hover:text-[#C7511F]">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
