import Link from 'next/link'
import type { Category } from 'lib/sanity.queries'

interface TopicsGridProps {
  categories: Category[]
}

export default function TopicsGrid({ categories }: TopicsGridProps) {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Development Topics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the latest insights, tools, and best practices across different areas of software development
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${category.color || '#6b7280'}, ${category.color || '#6b7280'}80)`
                }}
              ></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  {category.icon && (
                    <span 
                      className="text-4xl group-hover:scale-110 transition-transform duration-300"
                      role="img" 
                      aria-label={category.title}
                    >
                      {category.icon}
                    </span>
                  )}
                  <div 
                    className="w-3 h-3 rounded-full opacity-60"
                    style={{ backgroundColor: category.color || '#6b7280' }}
                  ></div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {category.title}
                </h3>
                
                {category.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                )}
                
                <div className="mt-4 flex items-center text-sm font-medium group-hover:text-gray-700 transition-colors">
                  <span style={{ color: category.color || '#6b7280' }}>
                    Explore topics →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
