import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface OrderItem {
  productId: number
  productName: string
  productImage: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  shippingAddress: {
    fullName: string
    address: string
    city: string
    state: string
    zip: string
    country: string
  }
  placedAt: string
  status: 'Processing' | 'Shipped' | 'Delivered'
}

interface OrderContextValue {
  orders: Order[]
  placeOrder: (order: Omit<Order, 'id' | 'placedAt' | 'status'>) => Order
}

const OrderContext = createContext<OrderContextValue | null>(null)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem('amazon-clone-orders')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('amazon-clone-orders', JSON.stringify(orders))
    }
  }, [orders])

  const placeOrder = (data: Omit<Order, 'id' | 'placedAt' | 'status'>): Order => {
    const order: Order = {
      ...data,
      id: `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      placedAt: new Date().toISOString(),
      status: 'Processing',
    }
    setOrders((prev) => [order, ...prev])
    return order
  }

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrders must be used within OrderProvider')
  return ctx
}
