import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Product } from '@/data/products'

interface WishlistContextValue {
  items: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem('amazon-clone-wishlist')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('amazon-clone-wishlist', JSON.stringify(items))
    }
  }, [items])

  const addToWishlist = (product: Product) => {
    setItems((prev) =>
      prev.find((p) => p.id === product.id) ? prev : [...prev, product]
    )
  }

  const removeFromWishlist = (productId: number) => {
    setItems((prev) => prev.filter((p) => p.id !== productId))
  }

  const isInWishlist = (productId: number) =>
    items.some((p) => p.id === productId)

  return (
    <WishlistContext.Provider
      value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
