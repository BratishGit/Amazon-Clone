import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { useCart } from '@/context/CartContext'
import { useOrders } from '@/context/OrderContext'
import { Lock } from 'lucide-react'

export const Route = createFileRoute('/checkout/')({
  component: CheckoutPage,
})

interface AddressForm {
  fullName: string
  address: string
  city: string
  state: string
  zip: string
  country: string
}

function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const { placeOrder } = useOrders()
  const navigate = useNavigate()

  const [form, setForm] = useState<AddressForm>({
    fullName: 'John Doe',
    address: '123 Main Street',
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
    country: 'United States',
  })
  const [errors, setErrors] = useState<Partial<AddressForm>>({})
  const [placing, setPlacing] = useState(false)

  const shipping = subtotal >= 25 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const validate = () => {
    const e: Partial<AddressForm> = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.state.trim()) e.state = 'State is required'
    if (!form.zip.trim()) e.zip = 'ZIP code is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePlaceOrder = () => {
    if (!validate()) return
    setPlacing(true)
    const order = placeOrder({
      items: items.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        productImage: i.product.image,
        price: i.product.price,
        quantity: i.quantity,
      })),
      subtotal,
      shipping,
      tax,
      total,
      shippingAddress: form,
    })
    clearCart()
    navigate({ to: '/checkout/success', search: { orderId: order.id } })
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#EAEDED]">
        <Navbar />
        <div className="max-w-screen-xl mx-auto px-4 py-16 text-center">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <Link to="/" className="text-[#007185] hover:text-[#C7511F] hover:underline">
            Return to shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-medium mb-6 text-center text-gray-900">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left: address form */}
          <div className="flex-1 space-y-4">
            {/* Shipping address */}
            <div className="bg-white rounded p-6">
              <h2 className="text-xl font-bold border-b pb-3 mb-4">
                <span className="bg-[#131921] text-white rounded-full w-7 h-7 inline-flex items-center justify-center text-sm mr-2">1</span>
                Shipping Address
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className={`w-full border rounded px-3 py-2 text-sm outline-none focus:border-[#FF9900] focus:ring-1 focus:ring-[#FF9900] ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className={`w-full border rounded px-3 py-2 text-sm outline-none focus:border-[#FF9900] focus:ring-1 focus:ring-[#FF9900] ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className={`w-full border rounded px-3 py-2 text-sm outline-none focus:border-[#FF9900] ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className={`w-full border rounded px-3 py-2 text-sm outline-none focus:border-[#FF9900] ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    className={`w-full border rounded px-3 py-2 text-sm outline-none focus:border-[#FF9900] ${errors.zip ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.zip && <p className="text-xs text-red-500 mt-1">{errors.zip}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#FF9900] bg-white"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded p-6">
              <h2 className="text-xl font-bold border-b pb-3 mb-4">
                <span className="bg-[#131921] text-white rounded-full w-7 h-7 inline-flex items-center justify-center text-sm mr-2">2</span>
                Payment Method
              </h2>
              <div className="flex items-center gap-3 p-3 border-2 border-[#FF9900] rounded bg-orange-50">
                <input type="radio" checked readOnly className="accent-[#FF9900]" />
                <span className="text-sm font-medium">Credit / Debit Card</span>
                <div className="ml-auto flex gap-1 text-xs text-gray-500">
                  <span className="border border-gray-300 px-1.5 py-0.5 rounded">VISA</span>
                  <span className="border border-gray-300 px-1.5 py-0.5 rounded">MC</span>
                  <span className="border border-gray-300 px-1.5 py-0.5 rounded">AMEX</span>
                </div>
              </div>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    placeholder="4242 4242 4242 4242"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#FF9900]"
                    defaultValue="4242 4242 4242 4242"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                  <input placeholder="MM/YY" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#FF9900]" defaultValue="12/28" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input placeholder="123" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#FF9900]" defaultValue="123" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <Lock size={12} /> Your payment information is encrypted and secure.
              </p>
            </div>
          </div>

          {/* Right: order summary */}
          <div className="lg:w-80 bg-white rounded p-6 sticky top-20">
            <h2 className="text-xl font-bold border-b pb-3 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded border" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium line-clamp-2">{item.product.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium shrink-0">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm border-t pt-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Items</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-[#007600]">FREE</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span><span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t pt-2 text-[#CC0C39]">
                <span>Order Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="w-full bg-[#FF9900] hover:bg-[#FA8900] disabled:opacity-70 text-gray-900 font-medium py-3 rounded-full transition-colors text-sm"
            >
              {placing ? 'Placing Order...' : 'Place your order'}
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              By placing your order, you agree to our Terms and Privacy Notice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
