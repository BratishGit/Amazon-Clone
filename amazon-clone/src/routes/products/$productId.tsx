import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import products from '@/data/products'
import { StarRating } from '@/components/StarRating'
import { Navbar } from '@/components/Navbar'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { Heart, ShoppingCart, Zap, ChevronLeft, ChevronRight, Check } from 'lucide-react'

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailPage,
  loader: async ({ params }) => {
    const product = products.find((p) => p.id === +params.productId)
    if (!product) throw new Error('Product not found')
    return product
  },
})

function ProductDetailPage() {
  const product = Route.useLoaderData()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const navigate = useNavigate()
  const [imageIdx, setImageIdx] = useState(0)
  const [qty, setQty] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const wishlisted = isInWishlist(product.id)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const handleAddToCart = () => {
    addToCart(product, qty)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    addToCart(product, qty)
    navigate({ to: '/checkout' })
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b px-4 py-2 text-sm text-[#007185]">
        <Link to="/" className="hover:text-[#C7511F] hover:underline">Home</Link>
        {' › '}
        <Link to="/" search={{ category: product.category }} className="hover:text-[#C7511F] hover:underline">{product.category}</Link>
        {' › '}
        <span className="text-gray-600 line-clamp-1">{product.name}</span>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image section */}
          <div className="md:w-2/5">
            {/* Main image */}
            <div className="relative border border-gray-200 rounded bg-gray-50 aspect-square overflow-hidden mb-3">
              <img
                src={product.images[imageIdx]}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImageIdx((i) => Math.max(0, i - 1))}
                    disabled={imageIdx === 0}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-1 disabled:opacity-30"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setImageIdx((i) => Math.min(product.images.length - 1, i + 1))}
                    disabled={imageIdx === product.images.length - 1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-1 disabled:opacity-30"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImageIdx(i)}
                    className={`border-2 rounded w-16 h-16 overflow-hidden bg-gray-50 ${
                      i === imageIdx ? 'border-[#FF9900]' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="md:w-2/5">
            <h1 className="text-2xl font-medium text-gray-900 mb-2">{product.name}</h1>

            {/* Brand / category */}
            <p className="text-sm text-[#007185] mb-2">
              Category: <span className="hover:underline cursor-pointer">{product.category}</span>
            </p>

            <StarRating rating={product.rating} reviewCount={product.reviewCount} />

            <div className="border-t border-gray-200 my-3" />

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-sm text-gray-600">Price:</span>
              <span className="text-3xl font-medium text-[#0F1111]">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            {discount && (
              <p className="text-sm text-[#CC0C39] font-medium mb-3">Save {discount}% ({discount}% off)</p>
            )}
            <p className="text-xs text-gray-500 mb-3">All prices include taxes where applicable.</p>

            {/* Description */}
            <p className="text-sm text-gray-700 leading-relaxed mb-4">{product.shortDescription}</p>

            {/* Specifications */}
            <div className="mb-4">
              <h3 className="font-bold text-sm mb-2">Key Features</h3>
              <ul className="space-y-1">
                {Object.entries(product.specifications).slice(0, 4).map(([k, v]) => (
                  <li key={k} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-[#FF9900]">›</span>
                    <span><strong>{k}:</strong> {v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Buy box */}
          <div className="md:w-1/5">
            <div className="border border-gray-200 rounded p-4 sticky top-20">
              <div className="text-2xl font-medium mb-1">${product.price.toFixed(2)}</div>
              <p className="text-sm text-[#007600] mb-1">FREE delivery Tomorrow</p>
              <p className="text-sm text-gray-600 mb-3">
                {product.stock > 0 ? (
                  <span className="text-[#007600] font-medium">In Stock</span>
                ) : (
                  <span className="text-[#CC0C39] font-medium">Out of Stock</span>
                )}
              </p>

              {product.stock > 0 && (
                <>
                  {/* Quantity */}
                  <div className="mb-3">
                    <label className="text-sm text-gray-600 block mb-1">Qty:</label>
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="border border-gray-300 rounded px-2 py-1 text-sm bg-gray-100 w-20"
                    >
                      {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#FF9900] hover:bg-[#FA8900] text-gray-900 font-medium py-2 rounded-full text-sm mb-2 flex items-center justify-center gap-2 transition-colors"
                  >
                    {addedToCart ? (
                      <><Check size={16} /> Added!</>
                    ) : (
                      <><ShoppingCart size={16} /> Add to Cart</>
                    )}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-[#FF9900] hover:bg-[#FA8900] text-gray-900 font-medium py-2 rounded-full text-sm flex items-center justify-center gap-2 transition-colors border-2 border-[#FF9900]"
                    style={{ background: '#FCD200', borderColor: '#FCD200' }}
                  >
                    <Zap size={16} /> Buy Now
                  </button>
                </>
              )}

              <button
                onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                className="w-full mt-2 border border-gray-300 py-2 rounded-full text-sm flex items-center justify-center gap-2 hover:bg-gray-50"
              >
                <Heart size={14} className={wishlisted ? 'fill-red-500 text-red-500' : ''} />
                {wishlisted ? 'Remove from Wishlist' : 'Add to Wish List'}
              </button>

              <div className="mt-3 text-xs text-gray-600 space-y-1">
                <p>Sold by: <span className="text-[#007185]">Amazon Clone Store</span></p>
                <p>Returns: Eligible for Return</p>
                <p>Payment: Secure transaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Full description + specs */}
        <div className="mt-10 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">About this item</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">Technical Specifications</h2>
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specifications).map(([k, v], i) => (
                  <tr key={k} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-2 px-3 font-medium text-gray-700 w-1/2">{k}</td>
                    <td className="py-2 px-3 text-gray-600">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
