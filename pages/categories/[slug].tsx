import { GetStaticPaths, GetStaticProps } from 'next'
import { groq } from 'next-sanity'
import BlogContainer from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import BlogLayout from 'components/BlogLayout'
import HeroPost from 'components/HeroPost'
import IndexPageHead from 'components/IndexPageHead'
import MoreStories from 'components/MoreStories'
import { readToken } from 'lib/sanity.api'
import { getClient, getSettings } from 'lib/sanity.client'
import { type Post, type Category, type Settings } from 'lib/sanity.queries'
import { GetStaticPropsContext } from 'next'

interface CategoryPageProps {
  posts: Post[]
  category: Category
  settings: Settings
  preview: boolean
  token: string | null
}

export default function CategoryPage({
  posts,
  category,
  settings,
  preview,
}: CategoryPageProps) {
  const [heroPost, ...morePosts] = posts || []

  return (
    <>
      <IndexPageHead settings={settings} />
      <BlogLayout preview={preview}>
        <BlogContainer>
          <BlogHeader title={settings?.title} level={1} />
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4">
              {category.icon && (
                <span className="mr-3" role="img" aria-label={category.title}>
                  {category.icon}
                </span>
              )}
              {category.title}
            </h2>
            {category.description && (
              <p className="text-lg text-gray-600">{category.description}</p>
            )}
          </div>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
              categories={heroPost.categories}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          {(!posts || posts.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No posts found in this category yet.
              </p>
            </div>
          )}
        </BlogContainer>
      </BlogLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps<CategoryPageProps> = async (ctx: GetStaticPropsContext) => {
  const { preview = false, previewData, params } = ctx
  const client = getClient(preview ? { token: readToken, perspective: previewData } : undefined)
  const slug = params?.slug as string

  const [settings, category] = await Promise.all([
    getSettings(client),
    client.fetch<Category>(
      groq`*[_type == "category" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        description,
        color,
        icon
      }`,
      { slug }
    )
  ])

  if (!category) {
    return {
      notFound: true,
    }
  }

  // Get posts in this category
  const posts = await client.fetch<Post[]>(
    groq`*[_type == "post" && references($categoryId)] | order(date desc, _updatedAt desc) {
      _id,
      title,
      date,
      _updatedAt,
      excerpt,
      coverImage,
      "slug": slug.current,
      "author": author->{name, picture},
      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current,
        description,
        color,
        icon
      },
      content,
    }`,
    { categoryId: category._id }
  )

  return {
    props: {
      posts,
      category,
      settings,
      preview,
      token: preview ? readToken : '',
    },
    revalidate: 60, // Revalidate every minute
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch<string[]>(
    groq`*[_type == "category" && defined(slug.current)][].slug.current`
  )

  return {
    paths: slugs?.map((slug) => ({ params: { slug } })) || [],
    fallback: 'blocking',
  }
}
