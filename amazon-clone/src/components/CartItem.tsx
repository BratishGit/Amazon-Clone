import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { CartItem as CartItemType } from '@/context/CartContext'
import { useCart } from '@/context/CartContext'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()
  const { product, quantity } = item

  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-0">
      <Link to="/products/$productId" params={{ productId: String(product.id) }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-24 object-cover rounded border border-gray-200"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link
          to="/products/$productId"
          params={{ productId: String(product.id) }}
          className="font-medium text-gray-900 hover:text-[#C7511F] line-clamp-2"
        >
          {product.name}
        </Link>
        <p className="text-sm text-green-700 mt-0.5">In Stock</p>

        <div className="flex items-center gap-3 mt-2">
          {/* Quantity control */}
          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="px-2 py-1 hover:bg-gray-100 transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="px-3 text-sm font-medium">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="px-2 py-1 hover:bg-gray-100 transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>
          <button
            onClick={() => removeFromCart(product.id)}
            className="text-sm text-[#007185] hover:text-[#C7511F] flex items-center gap-1"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>

      <div className="text-right shrink-0">
        <span className="font-bold text-lg">${(product.price * quantity).toFixed(2)}</span>
        {quantity > 1 && (
          <p className="text-xs text-gray-500">${product.price.toFixed(2)} each</p>
        )}
      </div>
    </div>
  )
}
