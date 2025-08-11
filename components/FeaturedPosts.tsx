import Link from 'next/link'
import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import CategoryTags from 'components/CategoryTags'
import type { Post } from 'lib/sanity.queries'

interface FeaturedPostsProps {
  posts: Post[]
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  const [mainPost, ...sidePosts] = posts.slice(0, 4)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Articles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Latest insights and tutorials from the world of development
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main featured post */}
          {mainPost && (
            <article className="lg:col-span-1">
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <CoverImage
                    title={mainPost.title}
                    image={mainPost.coverImage}
                    slug={mainPost.slug}
                    priority={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="space-y-4">
                  {mainPost.categories && mainPost.categories.length > 0 && (
                    <CategoryTags categories={mainPost.categories} variant="small" />
                  )}
                  
                  <Link href={`/posts/${mainPost.slug}`}>
                    <h3 className="text-3xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors leading-tight">
                      {mainPost.title}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <Date dateString={mainPost.date} />
                    {mainPost.author && (
                      <span>By {mainPost.author.name}</span>
                    )}
                  </div>
                  
                  {mainPost.excerpt && (
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {mainPost.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </article>
          )}

          {/* Side posts */}
          <div className="lg:col-span-1 space-y-8">
            {sidePosts.map((post) => (
              <article key={post._id} className="group cursor-pointer">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32">
                    <div className="relative overflow-hidden rounded-xl w-full h-full">
                      <CoverImage
                        title={post.title}
                        image={post.coverImage}
                        slug={post.slug}
                        priority={false}
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-2">
                    {post.categories && post.categories.length > 0 && (
                      <CategoryTags categories={post.categories.slice(0, 1)} variant="small" />
                    )}
                    
                    <Link href={`/posts/${post.slug}`}>
                      <h4 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors leading-tight line-clamp-2">
                        {post.title}
                      </h4>
                    </Link>
                    
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <Date dateString={post.date} />
                    </div>
                    
                    {post.excerpt && (
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/posts"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  )
}
