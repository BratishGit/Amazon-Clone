import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import products from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { Navbar } from '@/components/Navbar'
import { z } from 'zod'

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
})

export const Route = createFileRoute('/')({
  validateSearch: searchSchema,
  component: HomePage,
})

const CATEGORIES = ['All', 'Electronics', 'Books', 'Clothing', 'Home & Kitchen', 'Sports', 'Toys']

function HomePage() {
  const { q, category } = Route.useSearch()
  const navigate = useNavigate({ from: '/' })
  const [activeCategory, setActiveCategory] = useState(category ?? 'All')

  const handleSearch = (query: string) => {
    navigate({ search: { q: query || undefined, category: activeCategory !== 'All' ? activeCategory : undefined } })
  }

  const handleCategory = (cat: string) => {
    setActiveCategory(cat)
    navigate({ search: { q: q || undefined, category: cat !== 'All' ? cat : undefined } })
  }

  const filtered = useMemo(() => {
    let list = products
    if (q) {
      const lower = q.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower)
      )
    }
    const cat = activeCategory !== 'All' ? activeCategory : category
    if (cat && cat !== 'All') {
      list = list.filter((p) => p.category === cat)
    }
    return list
  }, [q, activeCategory, category])

  return (
    <div>
      <Navbar searchQuery={q} onSearch={handleSearch} />

      {/* Hero banner */}
      <div className="bg-gradient-to-b from-[#232F3E] to-[#EAEDED] py-10 px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Shop millions of products</h2>
        <p className="text-gray-300 text-lg">Free delivery on orders over $25</p>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Category filter pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === cat
                  ? 'bg-[#131921] text-white border-[#131921]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">
            {q ? `Results for "${q}"` : activeCategory !== 'All' ? activeCategory : 'All Products'}
          </h1>
          <span className="text-sm text-gray-500">{filtered.length} results</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded">
            <p className="text-xl text-gray-600 mb-2">No results found</p>
            <p className="text-gray-500">Try adjusting your search or browse all categories</p>
            <button
              onClick={() => { handleCategory('All'); navigate({ search: {} }) }}
              className="mt-4 px-6 py-2 bg-[#FF9900] rounded-full font-medium hover:bg-[#FA8900]"
            >
              Browse All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#131921] text-white mt-12">
        <div
          className="bg-[#37475A] py-3 text-center text-sm hover:bg-[#485769] cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top
        </div>
        <div className="max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          {[
            { title: 'Get to Know Us', links: ['Careers', 'About Us', 'Investor Relations'] },
            { title: 'Make Money with Us', links: ['Sell products', 'Become an Affiliate', 'Advertise'] },
            { title: 'Payment Products', links: ['Amazon Business Card', 'Shop with Points', 'Reload Balance'] },
            { title: 'Let Us Help You', links: ['Your Account', 'Your Orders', 'Shipping Rates', 'Help'] },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-bold mb-2">{section.title}</h4>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link}>
                    <span className="text-gray-300 hover:text-white cursor-pointer text-xs">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-400">
          © 2026 Amazon Clone made by Bratish
        </div>
      </footer>
    </div>
  )
}
