import { Link } from '@tanstack/react-router'
import { ShoppingCart, Search, MapPin, ChevronDown, Menu } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

interface NavbarProps {
  searchQuery?: string
  onSearch?: (q: string) => void
}

export function Navbar({ searchQuery = '', onSearch }: NavbarProps) {
  const { totalItems } = useCart()
  const [query, setQuery] = useState(searchQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Main nav */}
      <div className="bg-[#131921] text-white px-3 py-2 flex items-center gap-2">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0 border border-transparent hover:border-white rounded px-1 py-1 mr-1">
          <span className="text-white font-bold text-xl leading-none">amazon</span>
          <span className="text-[#FF9900] font-bold text-xl leading-none">.clone</span>
        </Link>

        {/* Deliver to */}
        <div className="hidden md:flex flex-col cursor-pointer border border-transparent hover:border-white rounded px-1 py-1 shrink-0">
          <span className="text-gray-300 text-xs">Deliver to</span>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span className="font-bold text-sm">United States</span>
          </div>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex flex-1 max-w-3xl mx-auto">
          <div className="flex w-full rounded overflow-hidden">
            <select className="bg-gray-200 text-gray-800 text-sm px-2 border-r border-gray-300 hidden lg:block cursor-pointer">
              <option>All</option>
              <option>Electronics</option>
              <option>Books</option>
              <option>Clothing</option>
              <option>Home &amp; Kitchen</option>
              <option>Sports</option>
              <option>Toys</option>
            </select>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Amazon Clone"
              className="flex-1 px-3 py-2 text-gray-900 text-sm outline-none min-w-0"
            />
            <button
              type="submit"
              className="bg-[#FF9900] hover:bg-[#FA8900] px-3 flex items-center justify-center"
            >
              <Search size={20} className="text-gray-900" />
            </button>
          </div>
        </form>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-1 ml-2 shrink-0">
          <div className="flex flex-col border border-transparent hover:border-white rounded px-2 py-1 cursor-pointer">
            <span className="text-xs text-gray-300">Hello, User</span>
            <div className="flex items-center gap-0.5">
              <span className="font-bold text-sm">Account &amp; Lists</span>
              <ChevronDown size={12} />
            </div>
          </div>

          <Link to="/account/orders" className="flex flex-col border border-transparent hover:border-white rounded px-2 py-1">
            <span className="text-xs text-gray-300">Returns</span>
            <span className="font-bold text-sm">&amp; Orders</span>
          </Link>

          <Link to="/cart" className="flex items-end gap-1 border border-transparent hover:border-white rounded px-2 py-1 relative">
            <div className="relative">
              <ShoppingCart size={32} />
              <span className="absolute -top-1 left-3 bg-[#FF9900] text-[#131921] text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-0.5">
                {totalItems}
              </span>
            </div>
            <span className="font-bold text-sm pb-0.5">Cart</span>
          </Link>
        </div>

        {/* Mobile cart */}
        <Link to="/cart" className="md:hidden flex items-center relative ml-auto">
          <ShoppingCart size={28} />
          {totalItems > 0 && (
            <span className="absolute -top-1 left-4 bg-[#FF9900] text-[#131921] text-xs font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-0.5">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* Category nav */}
      <div className="bg-[#232F3E] text-white px-3 py-1.5 flex items-center gap-1 overflow-x-auto whitespace-nowrap text-sm">
        <button className="flex items-center gap-1 px-2 py-1 hover:bg-gray-600 rounded shrink-0">
          <Menu size={16} />
          <span>All</span>
        </button>
        {['Electronics', 'Books', 'Clothing', 'Home & Kitchen', 'Sports', 'Toys'].map((cat) => (
          <Link
            key={cat}
            to="/"
            search={{ category: cat }}
            className="px-2 py-1 hover:bg-gray-600 rounded shrink-0"
          >
            {cat}
          </Link>
        ))}
        <Link to="/account/wishlist" className="px-2 py-1 hover:bg-gray-600 rounded shrink-0">
          Wishlist
        </Link>
      </div>
    </header>
  )
}
