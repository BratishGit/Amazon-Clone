import { createFileRoute, Link } from '@tanstack/react-router'
import { Navbar } from '@/components/Navbar'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import { StarRating } from '@/components/StarRating'
import { Heart, ShoppingCart } from 'lucide-react'

export const Route = createFileRoute('/account/wishlist')({
  component: WishlistPage,
})

function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Your Wish List</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded p-12 text-center">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-600 mb-2">Your Wish List is empty</p>
            <p className="text-gray-500 mb-6">Add items to your Wish List by clicking the heart icon on any product</p>
            <Link
              to="/"
              className="inline-block px-8 py-2 bg-[#FF9900] hover:bg-[#FA8900] rounded-full font-medium text-gray-900"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded p-6">
            <p className="text-gray-600 text-sm mb-4">{items.length} item{items.length !== 1 ? 's' : ''}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded hover:shadow-md transition-shadow">
                  <Link to="/products/$productId" params={{ productId: String(product.id) }} className="block">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover rounded-t"
                    />
                  </Link>
                  <div className="p-3">
                    <Link
                      to="/products/$productId"
                      params={{ productId: String(product.id) }}
                      className="font-medium text-sm text-gray-900 hover:text-[#C7511F] line-clamp-2 mb-1 block"
                    >
                      {product.name}
                    </Link>
                    <StarRating rating={product.rating} size="sm" />
                    <p className="font-bold mt-1">${product.price.toFixed(2)}</p>

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-[#FF9900] hover:bg-[#FA8900] text-gray-900 font-medium text-xs py-1.5 rounded-full flex items-center justify-center gap-1"
                      >
                        <ShoppingCart size={12} /> Add to Cart
                      </button>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        title="Remove from wishlist"
                        className="p-1.5 border border-gray-200 rounded-full hover:bg-red-50 hover:border-red-200"
                      >
                        <Heart size={14} className="fill-red-500 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
