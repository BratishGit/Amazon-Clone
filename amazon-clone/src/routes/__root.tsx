import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { OrderProvider } from '@/context/OrderContext'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Amazon Clone' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-[#EAEDED] min-h-screen">
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              {children}
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
        <Scripts />
      </body>
    </html>
  )
}
