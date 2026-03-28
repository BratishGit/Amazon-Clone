import { Link } from '@tanstack/react-router'
import { Heart } from 'lucide-react'
import type { Product } from '@/data/products'
import { StarRating } from '@/components/StarRating'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const wishlisted = isInWishlist(product.id)

  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null

  return (
    <div className="bg-white rounded border border-gray-200 hover:shadow-lg transition-shadow flex flex-col group">
      {/* Image */}
      <Link to="/products/$productId" params={{ productId: String(product.id) }} className="relative overflow-hidden bg-gray-50 rounded-t">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#CC0C39] text-white text-xs font-bold px-1.5 py-0.5 rounded">
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault()
            wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)
          }}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow hover:shadow-md transition-all"
          title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <Link
          to="/products/$productId"
          params={{ productId: String(product.id) }}
          className="text-sm font-medium text-gray-900 hover:text-[#C7511F] line-clamp-2 mb-1"
        >
          {product.name}
        </Link>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />

        <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <>
              <span className="text-xs text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              <span className="text-xs text-[#CC0C39] font-medium">-{discount}%</span>
            </>
          )}
        </div>

        {product.stock <= 10 && product.stock > 0 && (
          <p className="text-xs text-[#CC0C39] mt-1">Only {product.stock} left in stock</p>
        )}
        {product.stock === 0 && (
          <p className="text-xs text-gray-500 mt-1">Out of stock</p>
        )}

        <div className="mt-auto pt-3">
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className="w-full bg-[#FF9900] hover:bg-[#FA8900] disabled:bg-gray-200 disabled:text-gray-400 text-gray-900 font-medium text-sm py-1.5 rounded-full transition-colors"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
