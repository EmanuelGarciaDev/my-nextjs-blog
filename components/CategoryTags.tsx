import type { Category } from 'lib/sanity.queries'
import Link from 'next/link'

interface CategoryTagsProps {
  categories?: Category[]
  variant?: 'default' | 'small'
}

export default function CategoryTags({ 
  categories, 
  variant = 'default' 
}: CategoryTagsProps) {
  if (!categories || categories.length === 0) {
    return null
  }

  const baseClasses = variant === 'small' 
    ? 'inline-block px-2 py-1 text-xs font-medium rounded-full transition-colors hover:opacity-80'
    : 'inline-block px-3 py-1 text-sm font-medium rounded-full transition-colors hover:opacity-80'

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Link
          key={category._id}
          href={`/categories/${category.slug}`}
          className={baseClasses}
          style={{
            backgroundColor: category.color || '#6b7280',
            color: '#ffffff',
          }}
          title={category.description}
        >
          {category.icon && (
            <span className="mr-1" role="img" aria-label={category.title}>
              {category.icon}
            </span>
          )}
          {category.title}
        </Link>
      ))}
    </div>
  )
}
